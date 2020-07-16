'use strict';

const titleClickHandler=function(event){
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
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
  console.log('Links generated');

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
}
generateTitleLinks(); 

// part 3 - generate tags

function generateTags(){

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
    console.log (articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log (articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){  
      const linkHTML = '<li> <a href=" #tag-' + tag + '">' + tag + '&nbsp;</a></li>'; 
      console.log (linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
      tagWrapper.innerHTML = html;
    }

    /* insert HTML of all the links into the tags wrapper */

    const tagList = document.querySelector('.tags');

    /* END LOOP: for every article: */
  }
}
generateTags();

// Part 4 - Click Tag

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (const activeTagLink of activeTagLinks ) {

    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */

  const links = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */

  for (const link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();