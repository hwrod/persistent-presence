Package.describe({
  name: "hwrod:persistent-presence",
  summary: "A package to help track user presence for chat rooms",
  version: "1.0.16",
  //git: "https://github.com/hwrod/meteor-persistent-presence.git"
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');
  api.use('tracker', 'client');
  api.use('mongo');
  api.use('underscore');

  api.addFiles('lib/common.js');
  api.addFiles('lib/client.js', 'client');
  api.addFiles('lib/server.js', 'server');

  api.export('Presences');
  api.export('Presence');
});
