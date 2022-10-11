const page = () => {
  return `<!DOCTYPE html>
            <head></head>
            <body>
                <div class='container'>
                    <div class='card'>
                        <header>
                            <h2>Password protected site</h2>
                        </header>
                        <p id='description'>Please enter your password to access</p>
                        <div class='error-holder'>
                            <div style='visibility: hidden' id="error" >Incorrect Password</div>
                        </div>
                        <input type="password" id="pass" name="password" required placholder='Password'>
                        <input id='submit-button' type="submit" value="Submit" onclick="setCookie()">
                    </div>
                </div>
            </body>

            <script>
                async function setCookie() {
                    const password = document.getElementById("pass").value;
                    document.getElementById('error').style.visibility='hidden'
        
                    const res = await fetch("/create-token", {
                        method: "POST",
                        headers: { "Content-Type": "text/plain" },
                        body: password,
                    })
                    const data = await res.json();
     
                    if(data.error) {
            
                        document.getElementById('error').style.visibility='visible'
                    } else {
                        window.location.reload();
                    }

                }
            </script>

            <style>

               * {
                    padding :0px; 
                    margin:0px; 
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                }

               .container { 
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    align-items: center;
                    justify-content: center;
                    background-color: rgb(14, 30, 37)
               }

                .card { 
                    display: flex;
                    width:300px;
                    flex-direction: column;
                    background-color: white;
                    font-size: 1rem;
                    padding: 20px;
                    border-radius: 6px;
                
               }

               #description { 
                    margin: 4px 0px 4px 0px;
               }

               #pass { 
                    margin: 8px 0px;
                    font-size: 1rem;
                    border-radius: 6px;
                    padding: 8px 10px;
                    box-shadow: 0 1px 3px 0 rgb(255 255 255 / 0.1), 0 1px 2px -1px rgb(255 255 255 / 0.1);
                }

                .error-holder { 
                    height: 26px;
                    display:flex;
                    align-items: center;
                    color: red;
                 
                }

                #submit-button { 
                    font-size: 1rem;
                    padding: 8px 20px;
                    border-radius: 6px;
                    color: white;
                    background-color:#007067;
                    border: 2px solid #007067;
                }
                #submit-button:hover { 
                    border:2px solid #ff9d5c;
                    cursor: pointer;
                }

            </style>

        </html>`;
};

export default page;
