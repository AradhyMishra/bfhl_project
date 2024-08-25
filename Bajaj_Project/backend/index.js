const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const response = {
        is_success: true,
        user_id: "AradhyMishra", // Replace with your user ID
        email: "aradhycnb1@gmail.com", // Replace with your email
        roll_number: "21bce1734", // Replace with your roll number
        alphabets: [],
        numbers: [],
        highest_lowercase: ''
    };

    data.forEach(item => {
        if (typeof item === 'string' && isNaN(item)) {
            response.alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (!response.highest_lowercase || item > response.highest_lowercase) {
                    response.highest_lowercase = item;
                }
            }
        } else if (!isNaN(item)) {
            response.numbers.push(item);
        }
    });

    res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


