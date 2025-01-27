import Note from "../models/note.model.js";


const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find({})
        return res.status(200).json({success: true, notes})
    } catch (error){
        console.log("Error in getAllNotes", error)
        return res.status(500).json({ message: "Server error"})
    }
    

}

const writeNote = async (req, res) => {
    const { title, content, tag, color } = req.body;
    try{
        const exTitle = await Note.findOne({ title: title })


        if(exTitle){
            return res.status(401).json({ success: false, message: "Note already exists"})
        }

        const newNote = new Note({
            title,
            content,
            tag,
            color: color || "#9370DB"
        })

        const temp = {
            title: title,
            content: content,
            tag: tag,
            color: color
        }

        const savedNote = await newNote.save();

        res.status(201).json({ success: true, message: "Note Created Successfull", note: savedNote});
        return;
        
    } catch (error) {
        console.log("Error at creating new Post", error)
        return res.status(500).json({success: false, message: " Server Error"})
    }
}

const updateNote = async (req, res) => {
    const { title, content, tag, color } = req.body;
    const noteId = req.params.id;
    try {
        const updated = await Note.findByIdAndUpdate(noteId, {
            title,
            content,
            tag,
            color,
        }, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.json({ success: true, message: 'Note updated successfully', note: updated });

    } catch (error) {
        console.log("Error in updateNote API", error);
        res.status(500).json({ success: false, message: 'Failed to update note' });
    }
}


const singleNote = async (req, res) => {
    const noteId = req.params.id;
    try{
        const note = await Note.findById(noteId)

        if(!note){
            return res.status(404).json({ error:true, message:"Note not found"})
        }
        return res.status(200).json(note)
    } catch(error){
        console.log("Error in SingleNote", error)
        res.status(500).json({ message: "Server error "})
    }

}
const deleteNote = async (req, res) => {
    const deleteId = req.params.id;
    try{
        const note = await Note.findByIdAndDelete(deleteId)

        if(!note){
            return res.status(404).json({ success: false, message:"Note is Note Found"})
        }

        res.status(200).json({ success:true, message: 'Note deleted successfully', note });
    } catch (error){
        console.log("Error in Delete Route", Error)
        return res.status(500).json({ message:"Server error"})
    }
}

export { getAllNotes, writeNote, updateNote, singleNote, deleteNote };