$.getJSON('http://server.alcoholanalytics.com/api/hackathon/?m=577&d=c&f=2&l=&s=&t=j', function(data) {
    $.each(data, function(index) {
        // alert('data_id='+data[index].id);
        // receivedElement.innerHTML = 'Welcome to SmartBar at '+ data[index].liquid_type + ', ' + data[index].liquid_temp;
        // if data[index].liquid_type == 'Hackathon barnd'
        myimage = '../img/'+data[index].liquid_name;
        // alert('liquid_name='+data[index].liquid_name);
        // alert(img);

    });
});
