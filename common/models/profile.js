//var app = require('../../server/server');
module.exports = function(Profile, Team) {

  Profile.getEntireProfile = function(pid, cb) {
    var app = Profile.app;
    Profile.findById(pid,  function(err, profile) {
      // links the object
      if(err) {
        console.log(err)
      } else {
        profile.teams({ profileId:pid },function(err, teams){
          profile.socials({ profileId:pid },function(err, socials){
            profile.emailAddresses({ profileId:pid },function(err, emailAddresses){
              profile.education({ profileId:pid },function(err, education){
                profile.media({ profileId:pid },function(err, media){
                  profile.roles({ profileId:pid },function(err, roles){
                    profile.experience({ profileId:pid },function(err, experience){

                      // ----- compile object for response  -----
                      var response = { user : profile, companies : teams,
                        medias : media, work : experience,
                        social : socials, contact : emailAddresses,
                        edu : education, creds: roles };

                      // console.log( response );
                      cb(null, response);
                    });
                  });
                });
              });
            });
          });
        });
      }
    });
  };


  Profile.remoteMethod('getEntireProfile', {
    accepts: [
      {arg: 'pid', type: 'string'}
    ],
    returns: {arg: 'profile', type: 'object'},
    http: {path:'/entireprofile/:pid', verb: 'get'}
  });



};
