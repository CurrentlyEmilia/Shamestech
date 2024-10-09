const bdb = require('burgerdatabase');

globalThis.db = new bdb({
	path: './datastore.json',
	noGzip: true
});

globalThis.profile = {
	reinitialiseUserProfile(id)
	{
		globalThis.db.set(`uprf_${id}`, {warnings:0});
	},
	doesUserHaveAProfile(id)
	{
		if (globalThis.db.get(`uprf_${id}`) === undefined) return false;
		return true;
	},
	getUserProfile(id)
	{
		this.probeForProfileAndIfDoesntExistCreateIt();

		return globalThis.db.get(`uprf_${id}`);
	},
	probeForProfileAndIfDoesntExistCreateIt(id)
	{
		if (!globalThis.profile.doesUserHaveAProfile(id)) {
			globalThis.profile.reinitialiseUserProfile(id);
		};
	}
}

globalThis.moderative = {
	warnUser(id)
	{
		const profile = globalThis.db.get(`uprf_${id}`);

		profile.warnings++;

		globalThis.db.set(`uprf_${id}`, profile);

		return profile.warnings;
	}
}

module.exports = {
	db: globalThis.db,
	profile: globalThis.profile,
	moderative: globalThis.moderative
}

globalThis.odmianyCyfr = [
	"zerowe (co??)",
	"pierwsze",
	"drugie",
	"trzecie",
	"czwarte",
	"piąte",
	"szóste",
	"siódme",
	"ósme",
	"dziewiąte",
	"dziesiąte",
	"jedenaste",
	"dwunaste",
	"trzynaste",
	"czternaste",
	"piętnaste",
	"szesnaste",
	"siedemnaste",
	"osiemnaste",
	"dziewiętnaste",
	"dwudzieste",
	"dwudzieste pierwsze",
	"dwudzieste drugie",
	"dwudzieste trzecie",
	"dwudzieste czwarte",
	"dwudzieste piąte",
	"dwudzieste szóste",
	"dwudzieste siódme",
	"dwudzieste ósme",
	"dwudzieste dziewiąte",
	"trzydzieste"
]
