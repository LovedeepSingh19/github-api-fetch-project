const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'));
app.use(cors());

const port = 3000;

app.get('/', async (req, res) => {
    const userName = req.query.userName
    const page = req.query.page
    console.log(userName)
    if(userName){

        try {
            const apiRepoResponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=10&page=${page}`);
            const reposData = await apiRepoResponse.json();
            res.render('repoPage', { data: { heroes: reposData } });

        } catch (error) {
            console.error('Error fetching data from API:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});