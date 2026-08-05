import express from "express";
import generateQuestion from "../utils/generateQuestions.js";
import interviewSession from "../models/interviewSession.js";
// import 
// import { getFeedback } from "../controllers/intervi/ewController.js";

const router = express.Router();

// start interview
router.post("/start", async(req, res) =>{
    const {userId, role, experience, difficulty, interviewType} = req.body;

    // // validation
    // if(!userId||!role||!experience||!difficulty||!interviewType){
    //     return res.status(400).json({
    //         success: false,
    //         message: "userId, role, experience, difficulty, and interviewType are needed!"
    //     });
    // }

    // call gemini to ask questions
    const question = await generateQuestion({
        role,
        experience,
        difficulty,
        interviewType
    });

    // create new interview session
    const interviewSession = await InterviewSession.create({
        userId,
        role,
        experience,
        difficulty,
        interviewType
    });
})

// submit answer
router.post("/answer", (req, res) =>{
    try{
        const { id, answer } = req.body;
        const interviewSession = await InterviewSession.findById(sessionId);

        // find interview session in db
        const currentQuestion =
            interviewSession.questions[interviewSession.currentQuestionNumber];

        // Analyze answer
        const analysis = await generateAnalysis({
            question: currentQuestion,
            answer,
        });

        // save analysis in respon

    }catch(err){
        console.log("Analysis err:", err);
    }
});

// // terminate the interview
// router.post("/end");

export default router;