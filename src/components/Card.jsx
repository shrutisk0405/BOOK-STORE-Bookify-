
import React ,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {useFirebase} from '../context/Firebase';

const BookCard = (props) => {
    const firebase=useFirebase();
    const navigate= useNavigate();
    const [url,setURL]=useState(null);
   

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) =>setURL(url));
    },[]);
    console.log(props);
        return (
          <div  style={{ width: '30%', margin: '10px',display:'flex',flexwrap:'wrap',}}>
    
        <Card style={{ width: '25rem', margin:"25px" ,background:"black" , color:"white",borderColor:"white",}}>
          <Card.Img varient="top" src={url} style={{ width:"100%",borderradius:"50px",border:"solid",borderColor:"green",margin:"5px"}}/>
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
             Title {props.name}<br/>
              Sold By {props.displayName}  <br/>
             Price {props.price}<br/>
            </Card.Text>
            <Button  onClick = {(e)=> navigate(props.link)} variant="primary">View</Button>
          </Card.Body>
        </Card>
        </div>
      );
  
}

export default BookCard;