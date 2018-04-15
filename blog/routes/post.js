let posts = [
  {id: 0, title: 'post title0', body: 'post body0'},
  {id: 1, title: 'post title1', body: 'post body1'},
  {id: 2, title: 'post title2', body: 'post body2'}
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

exports.showAmp = (req, res) => {
  res.render('posts/showAmp', {post: posts[req.params.id]})
}

exports.showlist = (req, res) => {
  res.json( posts );
}

exports.new = (req, res) => {
  res.render('posts/new');
}

exports.newAmp = (req, res) => {
  res.render('posts/newAmp');
}

exports.create = (req, res) => {
  const index = req.originalUrl.lastIndexOf('/');
  if(req.originalUrl.match(/amp/g) !== null){
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*.ampproject.org');
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', 'http://' + req.headers.host);
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    res.json(req.body);
    const post = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 0,
      title: req.body.title,
      body: req.body.body
    }
    if(post.title && post.body){
      posts.push(post)
    }
  } else {
    const post = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 0,
      title: req.body.title,
      body: req.body.body
    }
    if(post.title && post.body){
      posts.push(post)
    }
    res.redirect('/')
  }
}

exports.edit = (req, res) => {
  res.render('posts/edit', {post: posts[req.params.id], id: req.params.id});
}

exports.editAmp = (req, res) => {
  res.render('posts/editAmp', {post: posts[req.params.id], id: req.params.id});
}

exports.destroy = function(req, res){
  if(req.body.id !== req.params.id){
    next(new Error('ID is not valid'))
  } else {
    const index = req.originalUrl.lastIndexOf('/');
    if(req.originalUrl.match(/amp/g) !== null){
      res.setHeader('Content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Origin', '*.ampproject.org');
      res.setHeader('AMP-Access-Control-Allow-Source-Origin', 'http://' + req.headers.host);
      res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
      posts.splice(parseInt(req.body.id), 1);
      posts = posts.map( (post, index) => {
        return (
          {
            id: index,
            title: post.title,
            body: post.body
          }
        )
      })
    } else {
      posts.splice(req.body.id, 1);
      res.redirect('/')
    }
  }
}

exports.update = function(req, res, next){
  if(req.body.id !== req.params.id){
    next(new Error('ID is not valid'))
  } else {
    const index = req.originalUrl.lastIndexOf('/');
    if(req.originalUrl.match(/amp/g) !== null){
      res.setHeader('Content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Origin', '*.ampproject.org');
      res.setHeader('AMP-Access-Control-Allow-Source-Origin', 'http://' + req.headers.host);
      res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
      posts[req.body.id] = {
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
      }
    } else {
      posts[req.body.id] = {
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
      }
      res.redirect('/')
    }
  }
}