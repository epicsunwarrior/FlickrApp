let Flickr = require('flickr-sdk');
var flickr = new Flickr(process.env.FLICKR_API_KEY);
const https = require('https');
const fs = require('fs');

let getPhotos = async function() {
  photos = await flickr.people.getPhotos({
    user_id: '83136374@N05',
    min_upload_date: 1564531200,
    max_upload_date: 1577836800,
    extras: 'date_upload,url_c'
  });

  photos = JSON.parse(photos.res.text);
  for (i in photos.photos.photo) {
    const photo_ = photos.photos.photo[i];
    let unix_timestamp = photo_.dateupload;
    var date = new Date(unix_timestamp * 1000);
    var month = date.getMonth()+1;
    var year = 2019;
    const file_name = photo_.id + '_' + month + '_' + year + '.jpg';
    const file = fs.createWriteStream("/Users/ajaysuresh/Desktop/PhotosForCopyright/" + file_name);
    const request = https.get(photo_.url_c, function(response) {
      response.pipe(file);
    });
    console.log(photo_.title + ';' + file_name + ';' + month + '/' + 2019);

  }
}

getPhotos();

