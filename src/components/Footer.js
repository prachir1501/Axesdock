var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "123px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

const year = new Date().getFullYear();

function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                
                    <p>Collaborators: Prachir Agrawal, Harshit Jajodia, Harshil Singhal</p>
                    <p>Mentored By: Abhishek Shingane and Saksham Bhushan</p>
                <p>Copyright © {year}</p>
                
                
            </div>
        </div>
    )
}

export default Footer