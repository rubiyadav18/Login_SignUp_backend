const db = require('../DB/db')
const jwt = require("jsonwebtoken");

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const from = "+13158163239"
const client = require('twilio')('AC39b459ff41465f6c7088ec2df1aad53e', 'bdac6ee187414506d9ab5fb83af51ffa');
const sendSMS = async (to, from, otp) => {
    await client.messages
        .create({
            body: otp,
            from: from,
            to: "+91" + to
        })
        .then(message => {

            return message
        });

}

const resgistration = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            password,
            mail,
            phoneNumber,
            gender,
            weight,
            occupaction,
            BMI,
            age,
            height,
            medical_condition,
            food_habit,
            food_allig,
            meal_a_day,
            Breackfast,
            Lunch,
            snacks,
            Dinner
        } = req.body;

        // Validate input
        if (!firstName || !lastName || !password || !mail || !phoneNumber || !gender || !weight || !occupaction || !BMI || !age || !height || !medical_condition || !food_habit || !food_allig || !meal_a_day || !Breackfast || !Lunch || !snacks || !Dinner) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if the email is already in use
        const existingUser = await db.User.findOne({
            where: {
                mail: {
                    [Op.eq]: mail,
                },
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Create a new user with hashed password and JSON data
        const newUser = await db.User.create({
            firstName,
            lastName,
            password: hashedPassword,
            mail,
            phoneNumber,
            gender,
            weight,
            occupaction,
            BMI,
            age,
            height,
            medical_condition,
            food_habit,
            food_allig,
            meal_a_day,
            Breackfast:JSON.stringify(Breackfast),
            Lunch:JSON.stringify(Lunch),
            snacks:JSON.stringify(snacks),
            Dinner:JSON.stringify(Dinner)
        });

        res.status(201).json({ message: 'Registration successful', newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//login api
const Login = async (req, res) => {
    try {
        const { password, mail } = req.body;
        if (!password || !mail) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await db.User.findOne({
            where: {
                mail: {
                    [Op.eq]: mail,
                },
            },
        });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'User Not found' });
        }

        // Compare hashed password
        console.log(password, user.password, "isPasswordValid");
        const isPasswordValid = await bcrypt.compare(String(password), String(user.password));


        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        // Successful login
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateFields = req.body;

    try {
        // Check if the user exists
        const existingUser = await db.User.findByPk(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user
        await db.User.update(updateFields, {
            where: {
                id: {
                    [Op.eq]: userId,
                },
            },
        });

        // Fetch and return the updated user
        const updatedUser = await db.User.findByPk(userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });


    }
}


const sendotp = async (req, res) => {
    try {
        const { mail, phoneNumber } = req.body;
        if ( !mail || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await db.User.findOne({
            where: {
                mail: {
                    [Op.eq]: mail,
                },
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);
        const newUser = await db.otp.create({mail, phoneNumber,OTP });
        await sendSMS(parseInt(phoneNumber), from, OTP); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const verifyotp = async (req, res) => {
    try {
        const { mail, phoneNumber, otp } = req.body;

        if (!mail || !phoneNumber || !otp) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingotpMail = await db.otp.findOne({
            where: {
                mail: {
                    [Op.eq]: mail,
                },
                otp: {
                    [Op.eq]: otp.toString(),
                },
            },
        });

        const existingotpPhone = await db.otp.findOne({
            where: {
                phoneNumber: {
                    [Op.eq]: phoneNumber,
                },
                otp: {
                    [Op.eq]: otp.toString(),
                },
            },
        });

        if (existingotpMail || existingotpPhone) {
            res.status(201).json({ message: 'OTP is correct' });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    resgistration,
    sendSMS,
    Login,
    updateUser,
    verifyotp,
    sendotp


}