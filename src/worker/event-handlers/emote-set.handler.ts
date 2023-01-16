import { imageHostToSrcset } from "@/common/Image";
import { log } from "@/common/Logger";
import { iterateChangeMap } from "./handler";
import { ChangeMap, EventContext } from "..";
import { WorkerHttp } from "../worker.http";

export function onEmoteSetCreate(ctx: EventContext, cm: ChangeMap<SevenTV.ObjectKind.EMOTE_SET>) {
	if (!cm.object) return;

	const es = cm.object;
	if (!es.emotes) es.emotes = [];

	for (const ae of es.emotes) {
		if (!ae.data) continue;

		ae.data.host.srcset = imageHostToSrcset(ae.data.host, "7TV", WorkerHttp.imageFormat);
		ae.provider = "7TV";
		ae.scope = "PERSONAL";
	}

	ctx.db.emoteSets.put(cm.object).catch((err) => log.error("<EventAPI>", "failed to insert emote set", err));
}

export function onEmoteSetUpdate(ctx: EventContext, cm: ChangeMap<SevenTV.ObjectKind.EMOTE_SET>) {
	iterateChangeMap<SevenTV.ObjectKind.EMOTE_SET>(cm, {
		emotes: {
			pushed: (v: SevenTV.ActiveEmote) => {
				ctx.db.emoteSets
					.where("id")
					.equals(cm.id)
					.modify((es) => {
						if (v.data) {
							v.data.host.srcset = imageHostToSrcset(v.data.host, "7TV", WorkerHttp.imageFormat);
							v.provider = "7TV";
							v.scope = "PERSONAL";
						}

						es.emotes.push(v);
					});
			},
			pulled: (_: SevenTV.ActiveEmote, old: SevenTV.ActiveEmote) => {
				ctx.db.emoteSets
					.where("id")
					.equals(cm.id)
					.modify((es) => {
						for (;;) {
							const i = es.emotes.findIndex((ae) => ae.id === old.id);
							if (i < 0) break;

							es.emotes.splice(i, 1);
						}
					});
			},
		},
	});
}
