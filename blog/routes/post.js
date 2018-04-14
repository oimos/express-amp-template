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
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*.ampproject.org');
  res.setHeader('AMP-Access-Control-Allow-Source-Origin', 'http://' + req.headers.host);
  res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');

  console.log('sent the name ' + req.body.title);
  console.log('request ' + req.body.body);

  res.json(req.body);

  const post = {
    title: req.body.title,
    body: req.body.body
  }
  posts.push(post)
  console.log(posts)
  // res.redirect('/')
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