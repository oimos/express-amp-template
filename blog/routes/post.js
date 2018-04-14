const posts = [
  {title: 'title0', body: 'body0'},
  {title: 'title1', body: 'body1'},
  {title: 'title2', body: 'body2'}
]

exports.index = (req, res) => {
  res.render('posts/index', {posts: posts});
}

exports.indexAmp = (req, res) => {
  res.render('posts/indexAmp', {posts: posts});
}

exports.show = (req, res) => {
  res.render('posts/show', {post: posts[req.params.id]});
}

exports.new = (req, res) => {
  res.render('posts/new');
}

exports.newAmp = (req, res) => {
  res.render('posts/newAmp');
}

exports.create = (req, res) => {
  const index = req.originalUrl.lastIndexOf('/');
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*.ampproject.org');
  res.setHeader('AMP-Access-Control-Allow-Source-Origin', 'http://' + req.headers.host);
  res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
  console.log(req.originalUrl)
  console.log(typeof req.originalUrl)
  if(req.originalUrl.match(/amp/g) !== null){
    res.json(req.body);
  }

  const post = {
    title: req.body.title,
    body: req.body.body
  }
  posts.push(post)
  res.redirect('/')
}

exports.edit = (req, res) => {
  res.render('posts/edit', {post: posts[req.params.id], id: req.params.id});
}

exports.destroy = function(req, res){
  console.log('req.body.id', req.body.id)
  console.log('req.params.id', req.params.id)
  if(req.body.id !== req.params.id){
    next(new Error('ID is not valid'))
  } else {
    posts.splice(req.body.id, 1);
    res.redirect('/')
  }
}

exports.update = function(req, res, next){
  if(req.body.id !== req.params.id){
    next(new Error('ID is not valid'))
  } else {
    posts[req.body.id] = {
      title: req.body.title,
      body: req.body.body,
    }
    res.redirect('/')
  }
}