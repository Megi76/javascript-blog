'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement=this;
  console.log('Link was clicked!');
  console.log(event); 

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){ 
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active'); 
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct atticle using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active'); 
};

// Part 2 - generate links

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

const generateTitleLinks = function(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE]for each article: */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log (optArticleSelector + customSelector);

  let html = '';
    
  for(let article of articles){
      
    /* a: get the article id */
    const articleId = article.getAttribute('id');
    console.log (articleId);

    /* b: find the title element */
    /* c: get  title from  title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log (articleTitle);

    /* d: create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* e: insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
      
  const links = document.querySelectorAll(' .titles a');
      
  for (let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};
generateTitleLinks(); 

// part 3 - generate tags

const generateTags = function(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);  
  
  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log (tagWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log (articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){  

      /* generate HTML of the link */
      const linkHTML = '<li> <a href=" #tag-' + tag + '">' + tag + '&nbsp;</a></li>'; 
      console.log (linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }    
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
};
generateTags();

// Part 4 - Click Tag

const tagClickHandler = function(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags ) {

    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag +'"]');
};

// part 4b - clicklistener to tag

const addClickListenersToTags = function(){

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);

  /* START LOOP: for each link */
  for (let linkToTag of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
};

addClickListenersToTags();

// part 5 - add authors

const generateAuthors = function(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);  
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){
  
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /*grenerate HTML of the link*/
    const linkAuthor = '<p><a href="#author-' + author +'">by ' + author+ '</a></p>';
    html = html + linkAuthor;

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
  }
};
generateAuthors();

// part 6 - click author

const authorClickHandler = function(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors ) {

    /* remove class active */
    activeAuthor.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author +'"]');
};

const addClickListenersToAuthors = function() {

  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author"]');
    
  /* START LOOP: for each link */
  for (let linkToAuthor of allLinksToAuthors) {
    
    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
};
  
addClickListenersToAuthors();