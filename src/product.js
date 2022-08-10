import React, {useState,useEffect} from "react";
import Header from "./header";
import "./header.css";

const Product = () =>{
	const [data,setData] = useState([]);
	const [searchTerm,setSearchTerm] = useState("select category");
	const [show,setShow] = useState(0);
	const [show2,setShow2] = useState(10);
	const [invent,setInvent] = useState(false);
	useEffect(() => {
    fetch('https://fakestoreapi.com/products')

      .then((d) => {
        return d.json();

      })
      .then((pData) => {
      	//console.log(pData)
        setData(pData)
        console.log(data);
      }).catch((err)=>{
      });
  }, []);

	const handleClick = (e) =>{
		let a = show;
		let b = show2;
		console.log(show);
		if(a>data.length-11)
		{
			let c = 0 
			let d = 10
			setShow(c)
			setShow2(d)
		}
		else
		{
			setShow(a+10)
			setShow2(b+10)
			console.log(data)
		}
	}

	return(
		<>
		<Header/>
		<div className="select">
			<select onChange={(e)=>setSearchTerm(e.target.value)}>
				<option>select category</option>
				<option>men's clothing</option>
				<option>jewelery</option>
				<option>electronics</option>
				<option>women's clothing</option>
			</select>
			<button onClick={handleClick} className="b1">Next</button>
		</div>
		<div>
			{
				data.filter((user)=>{
					if(searchTerm==="select category")
					{
						console.log(user);		
						return user;
					}
					else if(user.category.includes(searchTerm)){
						console.log(searchTerm);
						return user;
					}
				}).slice(show,show2).map((user,i)=>{
				return(
					<>
					<div className="card2">
						<div className="card1" >
						<img src={user.image} onMouseEnter={()=>setInvent(true)} onMouseLeave={()=>setInvent(false)} class="card-img-top"id="mainimage" alt={user.title}/>
						</div>
						{invent ? <div className="pop-up" key={user.id}>
									<h3>{user.category}</h3>
									<div className="desc">
										<img src={user.image} className="img1"/>
										<p>{user.description}</p>
									</div>
								</div> : <div></div>}
					</div>
					</>
					)
				})
			}	
		</div>
		</>
		)
}

export default Product;