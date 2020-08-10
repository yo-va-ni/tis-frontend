const router = require('express').Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth')

// function to get a manageable note
const getManageableNote = note => {
  return {
    _id : note._id,
    title : note.title,
    content : note.content,
  };
}

router.get('/notes', isAuthenticated, async(req, res) => {
  await Note.find({user: req.user._id}).sort({date: 'desc' })
    .then(protoList => {
      const allowedList = protoList.map( getManageableNote );
      res.render('notes/show-notes',{ allowedList });
    });
});

router.get('/notes/new-note', isAuthenticated, (req, res) => {
  res.render('notes/new-note.hbs');
});

router.post('/add-note', isAuthenticated, async(req, res) => {
  const {title, content} = req.body;
  let errors = [];
  if(!title) errors.push({msg: "Please, write a Title"});
  if(!content) errors.push({msg: "Please, write a Content"})
  if(errors.length > 0){
    res.render('notes/new-note.hbs',{errors,title,content});
  }else{
    const newNote = new Note({title, content});
    newNote.user = req.user._id;
    await newNote.save();
    req.flash('success_msg', 'new note added successfully');
    res.redirect('/notes');
  }
})

router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
  await Note.findById(req.params.id)
    .then(getManageableNote)
    .then(note => {
      res.render('notes/edit-note',{ note });
    });
})

router.put('/notes/edited-note/:id', isAuthenticated, async(req, res) => {
  const {title, content} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title: title, content: content});
  req.flash('success_msg','note edited successfully');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','note deleted successfully');
  res.redirect('/notes');
})

module.exports = router;