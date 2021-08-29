const Employee = require("../lib/employee");

const startHTML = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>Document</title>
    </head>
    
    <body>
        <div class="container">
            <header class="d-flex justify-content-center bg-primary text-white">
                <h1 class="p-3">My Team</h1>
            </header>
        </div>
        <main>
            <div class="container">
                <div class="row">`;
    
                    
};

const endHTML = () => {
    return    `</div>
            </div>
    
        </main>
    
    </body>
    
    </html>`
};

module.exports = {
    startHTML, endHTML
};

