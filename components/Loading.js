import { Circle } from "better-react-spinkit";

function Loading() {
	return (
		<center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
			<div>
				<img
					src="https://media.istockphoto.com/vectors/-vector-id1010001882?k=20&m=1010001882&s=612x612&w=0&h=6ZqzWlYBD3bT2EqJolzC3xbIKVVy350qMQmmS6B-Wd4="
					alt="telephon"
					height={200}
					style={{ marginBottom: 10 }}
				/>
				<Circle color="#3CBC28" size={60}></Circle>
			</div>
		</center>
	);
}

export default Loading;
