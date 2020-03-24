<template>
  <div class="container">
<!--     <br>
    <a href="/Categories/advice">Advice</a>
    <br>
    <a href="/Categories/beta_room">Beta Room</a>
    <br>
    <a href="/Categories/gear_room">Gear Room</a>
    <br>
    <a href="/Categories/feedback">Feedback</a>
    <br> -->
  


    <section class="content-section">
      <!-- <div class="container"> -->
        <div class="row">
          <div class="col-lg-8">
            <div class="page-main">

              <!-- start of advice -->
              <div class="blog-list-box border-gradient-info mb-30">
                <div class="blog-head">
                  <img src="/images/blog_01.jpg" alt="blog-featured-img">
                </div>
                <div class="blog-content">
                  <div class="blog-content-head">
                  </div>
                  <div class="blog-content-body">
                    <h2 class="cat-advice-header mb-20"><a href="/Categories/advice">ADVICE</a></h2>
                    <p class="blog-desc mb-30 text-white">A place for climbers to seek and give advice. Struggling with a project? Take a picture, post it, we'll text you when someone replies!</p>
                  </div>
                </div>
                <div class="blog-footer">
                  <div class="row">
                    <div class="col-sm-4">
                      <p class="mb-0 blog-comment text-white"><span class="text-dim"><i class="mdi mdi-comment-processing "></i> Posts : </span>Need to create API call</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of advice -->

              <!-- start of Beta Room -->
              <div class="blog-list-box border-gradient-pri mb-30">
                <div class="blog-head">
                  <img src="/images/blog_01.jpg" alt="blog-featured-img">
                </div>
                <div class="blog-content">
                  <div class="blog-content-head">
                  </div>
                  <div class="blog-content-body">
                    <h2 class="cat-br-header mb-20"><a href="/Categories/beta_room">Beta Room</a></h2>
                    <p class="blog-desc mb-30 text-white">Send your latest project? Set a sweet route on your home wall? This is the place for you!</p>
                  </div>
                </div>
                <div class="blog-footer">
                  <div class="row">
                    <div class="col-sm-4">
                      <p class="mb-0 blog-comment text-white"><span class="text-dim"><i class="mdi mdi-comment-processing "></i> Posts : </span>Need to create API call</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of Beta Room -->

              <!-- start of Gear Room -->
              <div class="blog-list-box border-gradient-def mb-30">
                <div class="blog-head">
                  <img src="/images/blog_01.jpg" alt="blog-featured-img">
                </div>
                <div class="blog-content">
                  <div class="blog-content-head">
                  </div>
                  <div class="blog-content-body">
                    <h2 class="cat-gr-header mb-20"><a href="/Categories/gear_room">Gear Room</a></h2>
                    <p class="blog-desc mb-30 text-white">Send your latest project? Set a sweet route on your home wall? This is the place for you!</p>
                  </div>
                </div>
                <div class="blog-footer">
                  <div class="row">
                    <div class="col-sm-4">
                      <p class="mb-0 blog-comment text-white"><span class="text-dim"><i class="mdi mdi-comment-processing "></i> Posts : </span>Need to create API call</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of Gear Room -->

              <!-- start of Feedback -->
              <div class="blog-list-box border-gradient-reg mb-30">
                <div class="blog-head">
                  <img src="/images/blog_01.jpg" alt="blog-featured-img">
                </div>
                <div class="blog-content">
                  <div class="blog-content-head">
                  </div>
                  <div class="blog-content-body">
                    <h2 class="cat-feedback-header mb-20"><router-link v-bind:to="'/Categories/feedback'">Feedback</router-link></h2>
                    <p class="blog-desc mb-30 text-white">Send your latest project? Set a sweet route on your home wall? This is the place for you!</p>
                  </div>
                </div>
                <div class="blog-footer">
                  <div class="row">
                    <div class="col-sm-4">
                      <p class="mb-0 blog-comment text-white"><span class="text-dim"><i class="mdi mdi-comment-processing "></i> Posts : </span>Need to create API call</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of Feedback -->

              <div class="blog-list-box blog-quote mb-30">
                <div class="blog-content">
                  <div class="blog-content-body">
                    <blockquote class="blockquote">
                      <p class="mb-0 text-dim">Doubt is the enemy of success.</p>
                      <footer class="blockquote-footer mt-2">Jim Bridwell</footer>  
                    </blockquote>
                  </div>
                </div>
              </div>

            </div>            
          </div>
        </div>
      <!-- </div> -->
    </section>

  </div>
</template>

<style>
  .cat-advice-header {
    color: #fff;
    text-shadow: 2px 2px #ff6e7f;
  }
  .cat-advice-header:hover{
    color: #ff6e7f;
    text-shadow: 2px 2px #fff;
  }
  .cat-br-header {
    color: #fff;
    text-shadow: 2px 2px #e45bd2;
  }
  .cat-br-header:hover {
    color: #e45bd2;
    text-shadow: 2px 2px #fff;
  }
  .cat-gr-header {
    color: #fff;
    text-shadow: 2px 2px #30d06e;
  }
  .cat-gr-header:hover {
    color: #30d063;
    text-shadow: 2px 2px #fff;
  }
  .cat-feedback-header {
    color: #fff;
    text-shadow: 2px 2px #02d9ff;
  }
  .cat-feedback-header:hover {
    color: #02d9ff;
    text-shadow: 2px 2px #fff;
  }
</style>

