import "./Home.css";


function Home() {
  return (
    <div className="home-container">
      <h1>SUPHALUCK CHAMNA</h1>
      <div className="info-container">
        <div className="info-text">
          <p>
          ศุภลักษณ์ จันทร์มา
          <br />
           <p>
            65058688
          </p>      
          คณะ เทคโนโลยีสารสนเทศ
          <br />
          สาขา วิทยาการคอมพิวเตอร์และการพัฒนาซอฟต์แวร์
          <br />
          มหาวิทยาลัยศรีปทุม
          </p>
        </div>
        
        <img
          className="profile-picture"
          src="./"
          alt="Profile"
        />
      </div>
    </div>
  );
}

export default Home;

