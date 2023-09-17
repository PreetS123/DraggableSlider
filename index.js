const carouselItem = [
    {
      title: 'Item 1',
      img: 'https://img.freepik.com/premium-photo/anime-girl_811396-10363.jpg',
      content: 'lorem lorem'
    },
    {
      title: 'Item 2',
      img: 'https://img.freepik.com/premium-photo/anime-girl-watching-sunset-3d-illustration_717906-1415.jpg',
      content: 'lorem lorem lorem'
    },
    {
      title: 'Item 3',
      img: 'https://wallpapers.com/images/hd/anime-girl-pictures-qdrr4z43vy4xlj5t.jpg',
      content: 'shivani lorem lorem lorem lorem lorem lorem'
    },
    {
      title: 'Item 4',
      img: 'https://i.pinimg.com/736x/14/5a/c6/145ac61c8b9b047e70d894064e2c313e.jpg',
      content: 'arshi lorem lorem lorem lorem lorem lorem'
    },
    {
      title: 'Item 5',
      img: 'https://1fid.com/wp-content/uploads/2022/07/girl-anime-wallaper-25.jpg',
      content: 'suraj lorem lorem lorem lorem lorem lorem lorem lorem lorem'
    },
    {
      title: 'Item 6',
      img: 'https://wallpapers.com/images/hd/cute-profile-picture-bxmwah5el6rxxp8g.jpg',
      content: 'saif lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem'
    },
    {
      title: 'Item 7',
      img: 'https://w0.peakpx.com/wallpaper/376/596/HD-wallpaper-anime-girl-2-anime-girl.jpg',
      content: 'viabhav lorem lorem lorem lorem lorem lorem'
    },
    {
      title: 'Item 8',
      img: 'https://img.freepik.com/premium-photo/japanese-girl-cherry-blossom-tree-landscape-anime-manga-illustration_691560-7776.jpg',
      content: 'preeti lorem lorem lorem'
    },
    {
      title: 'Item 9',
      img: 'https://cdn5.vectorstock.com/i/1000x1000/65/54/cute-anime-girl-in-black-hoodie-and-green-eyes-vector-39706554.jpg',
      content: 'shrinu lorem lorem lorem lorem lorem lorem'
    }
  ]
  
const carousel= document.querySelector(".carousel");
const wrapper= document.querySelector(".wrapper");
const arrowBtn= document.querySelectorAll(".wrapper i");
const firstCardWidth= carousel.querySelector(".card").offsetWidth;
const carouselChildrens=[...carousel.children];

let isDragging= false,startX,startScrollingLeft, timeoutId;

//Get the number of cards that can fit into carousel at once
let cardPerView= Math.floor(carousel.offsetWidth/firstCardWidth);

//Insert copies of the last few cards to beginning of carousel for infinite view.
carouselChildrens.slice(-cardPerView).reverse().forEach(card=>{
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML)
})

//Insert copies of the last few cards to beginning of carousel for infinite view.
carouselChildrens.slice(0,cardPerView).forEach(card=>{
    carousel.insertAdjacentHTML("beforeend",card.outerHTML)
})

//Add event listener for the arrow button to scroll the arrow left and right.
arrowBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        // console.log(btn.id);
        carousel.scrollLeft+=btn.id==="left"? -firstCardWidth: firstCardWidth;
    })
})

const autoPlay=()=>{
  if(window.innerWidth<800) return; //Return if window is smaller than 800
  //auto play the carousel after every 2500 sec.
  timeoutId= setTimeout(()=>carousel.scrollLeft += firstCardWidth,1500)
}

autoPlay();

const dragging=(e)=>{
    // console.log(e.pageX);
    if(!isDragging) return;
    carousel.scrollLeft=startScrollingLeft - (e.pageX-startX);
}
const draggStart=(e)=>{
   isDragging= true;
   carousel.classList.add("dragging");
   startX=e.pageX;
   startScrollingLeft= carousel.scrollLeft;
}
const dragStop=(e)=>{
    isDragging=false;
    carousel.classList.remove("dragging");
}

const infiniteScroll=()=>{
  // if the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft<=0){
      carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    setTimeout(() => {
      carousel.classList.remove("no-transition");
    }, 0);
    console.log("left end");
    }
    else if(Math.ceil(carousel.scrollLeft)>=carousel.scrollWidth-carousel.offsetWidth){
      carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    setTimeout(() => {
      carousel.classList.remove("no-transition");
    }, 0);
    console.log("right end");
    }
    //clear existing timeout and start autoplay if mouse is not hovering 
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();

}
   
   carousel.addEventListener("mousemove",dragging);
   carousel.addEventListener("mousedown",draggStart);
   document.addEventListener("mouseup",dragStop);
   document.addEventListener("scroll",infiniteScroll);
   wrapper.addEventListener("mouseenter",()=>clearTimeout(timeoutId));
   wrapper.addEventListener("mouseleave",autoPlay);