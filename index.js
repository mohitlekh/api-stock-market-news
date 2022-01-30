const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const PORT = process.env.PORT || 5500;

const newspapers = [
    {
        name: 'times',
        address: 'https://www.thetimes.co.uk/business'
    },
    {
        name: 'mint',
        address: 'https://www.livemint.com/market/stock-market-news'
    },
    {
        name: 'hindustantimes',
        address: 'https://www.hindustantimes.com/business'
    },
    {
        name: 'zeebusiness',
        address: 'https://www.zeebiz.com/markets'
    },
    {
        name: 'Indianexpress',
        address: 'https://indianexpress.com/section/business/market/'
    },
    {
        name: 'Businessinsider',
        address: 'https://markets.businessinsider.com/news'
    },
    {
        name: 'Businessstandard',
        address: 'https://www.business-standard.com/markets'
    },
]

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("stock")',html).each(function () {
           const title = $(this).attr('title') || $(this).text();
           const url = $(this).attr('href');

           articles.push({
               title,
               url,
               source: newspaper.name
           })
        })
    })       
});

const articles = [];
const article = [];
app.get('/', (req,res) => {
    res.send('Welcome to my api');
});

app.get('/news', (req,res) => {
        res.json(articles);
});

app.get('/news/:newspaperId', async (req,res) => {
    const newspaperId = req.params.newspaperId;

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address;

    axios.get(newspaperAddress)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("stock")',html).each(function () {
           const title = $(this).attr('title') || $(this).text();
           const url = $(this).attr('href');

           article.push({
               title,
               url,
               source: newspaperId,
           })
        })
    }) 
    res.json(article);   
    
});

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
