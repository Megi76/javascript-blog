'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
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
  optArticleAuthorSelector = '.post-author',
  optTagListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list',
  optCloudAuthorClassCount = '4',
  optCloudAuthorClassPrefix = 'author-size-';
  
const generateTitleLinks = function(customSelector = ''){

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

function calculateTagsParams(tags) {
  const params = {
    'max' : 0,
    'min' : 999999
  };

  for(let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }  
    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  
  return optCloudClassPrefix + classNumber;
}


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);  
  
  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    
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
      const linkHTML = '<li> <a href="#tag-' + tag + '">' + tag + '</a></li>     '; 

      /* add generated code to html variable */
      html = html + linkHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }    
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    
    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

// Part 4 - Click Tag

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log (clickedElement);

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
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag +'"]');
}

// part 4b - clicklistener to tag

function addClickListenersToTags() {

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkToTag of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}
addClickListenersToTags();

// part 5 - add authors

function calculateAuthorsParams(authors){
  const params = {
    'max' : 0,
    'min' : 999999
  };

  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');

    if(authors[author] > params.max) {
      params.max = authors[author];
    }  
    if(authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudAuthorClassCount - 1) + 1);

  return optCloudAuthorClassPrefix + classNumber;
}

function generateAuthors (){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);  

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

    /* add generated code to html variable */
    html = html + linkAuthor;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[author]){

      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */  
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log(authorsParams);

  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors */
  for(let author in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    
    const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '"><span>' + author + '</span></a></li>' + '(' + allAuthors[author] + ')';
    
    console.log('authorLinkHTML:', authorLinkHTML);
    
    allAuthorsHTML += authorLinkHTML;
    /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;

}

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

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author +'"]');
};

// part 6b - clicklistener to author
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