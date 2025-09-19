const Question=require("../models/Question");
const Session=require("../models/Session");

//@desc add additonal questoion to existing session
//@route POST/api/questions/add
//@access Private
const addQuestionsToSession=async(req,res)=>{
    try{
        const {SessionId,questions}=req.body;
        if(!SessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({message:"Invalid input data"});
        }

        const session=await Session.findById(SessionId);
        if(!session){
            return res.status(400).json({message:"Server not found"});
        }

        //Create a neew questions
        const createdQuestions=await Question.insertMany(
            questions.map((q)=>({
                session:SessionId,
                question:q.question,
                answer:q.answer,
                
            }))
        );
        //Update session to include new question IDs
        session.questions.push(...createdQuestions.map((q)=>q._id));
        await session.save();
        res.status(201).json(createdQuestions);
    }catch(error){
        res.status(500).json({message:"server Error"});
    }
};

//@desc Pin or unpin a question
//@route post/api/question/:id/pin
//@acess Private
const togglePinQuestion=async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id);
        if(!question){
            return res.status(400).json({ success:false,message:"Question not found"});
        }
        question.isPinned=!question.isPinned;
        await question.save();

    }catch(error){
        res.status(500).json({message:"server Error"});
    }
}

//@desc Update note for  a question
//@route post/api/question/:id/note 
//@acess Private
const updateQuestionNote=async(req,res)=>{
    try{
        const {note}=req.body;
        const question=await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({ success:false,message:"Question not found"});
        }
        question.note=note || "";
        await question.save();

        res.status(200).json({success:true,question});
    }catch(error){
        res.status(500).json({message:"server Error"});
    }
}

module.exports={togglePinQuestion,updateQuestionNote,addQuestionsToSession};