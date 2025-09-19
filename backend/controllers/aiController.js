const {GoogleGenAI}=require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt} =require("../utils/prompts");


const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

//@desc generate interview questions and answers using gemini
//@route POST/api/ai/generate-questions
//@access Private

const generateInterviewQuestions=async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,numberOfQuestions}=req.body;
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields "});
        }   
        const prompt=questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);;

        const response=await ai.models.generateContent({
            model:'gemini-2.0-flash-lite',
            contents:prompt,
        });
        let rawtext=response.text;

        //clean it remove ```json and ``` from beginning and end 
        const cleanedText=rawtext
            .replace(/^```json\s*/,"")
            .replace(/```$/,"")
            .trim();
        // now safe to parse
        const data =JSON.parse(cleanedText);

        res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"Failed to generate questons",error:error.message});
    }
}

//@desc generate explains interview questions 
//@route POST/api/ai/generate-explaination
//@access Private
const generateConceptExplanation=async(req,res)=>{
    try{
        const {question}=req.body;

        if(!question){
            return res.status(400).json({message:"Missing required fields"});
        }
        const prompt=conceptExplainPrompt(question);

        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        });
        let rawtext=response.text;
        const cleanedText=rawtext
            .replace(/^```json\s*/,"")
            .replace(/```$/,"")
            .trim();
        // now safe to parse
        const data =JSON.parse(cleanedText);

        res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"Failed to generate questons",error:error.message});
    }
};

module.exports={generateInterviewQuestions,generateConceptExplanation};