const fetching = async (lat, lng, radius, type)=>{

    console.log("Hello", lat, lng, radius, type);

    try {

        const response = await fetch(`https://demographic-harvesting-backend-dgavini2.onrender.com/fetch?lat=${lat}&lng=${lng}&radius=${radius}&method=${type}`);
        //const response = await fetch(`http://localhost:4000/fetch?lat=33.28232392051035&lng=-96.5753173828125&radius=3000`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
       // console.log("This is fetched Data", data );
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }

}


module.exports=fetching;
