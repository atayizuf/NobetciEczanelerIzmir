async function denemmeler() {
  const deneme = await fetch("https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler");
  const sonuc = await deneme.json();
  const mapMetin = document.querySelector(".ecbiltutan");
  const arametin = document.querySelector(".arametin");
  const arabuton = document.querySelector(".arabuton");
  arametin.addEventListener("click", temizle);
  arabuton.addEventListener("click", setAttr);
  function yap() {
    const arananmetin = arametin.value.toLowerCase();
    if (arananmetin != "") {
      console.log(arananmetin);
    }
  }
  function temizle() {
    arametin.value = "";
  }

  let clickdurum=document.querySelector('#topagit');
  clickdurum.addEventListener("click", function() {
    window.scrollTo(0,0);
  });

  function setAttr(cord) {
    let kordinatim = cord;
    let d1 = kordinatim.split(",");
    //console.log(d1[0],d1[1]);
    let ss = document.querySelector(".map");
    let mm = document.getElementsByClassName('link')[0];
    let yazi = `https://maps.google.com/maps?q=${d1[0]},${d1[1]}&hl=es;z=14&output=embed`;
    ss.children[0].setAttribute("src", yazi);
    mm.setAttribute('href',`https://maps.google.com/maps?q=${d1[0]},${d1[1]}&hl=es;z=14`);
    document.getElementsByClassName('macacust')[0].style.display="flex";
    //console.log(yazi);
  }
  // sonuc.sort((a,b) => {
  //   if(a.Bolge<b.Bolge){
  //     return -1;
  //   }});
  
  sonuc.sort(function (a, b) {
    return a.Bolge.localeCompare(b.Bolge);
  });  // Bölge ismine göre sıralama ALFABETIK
  sonuc.forEach((x) => {
    const fucks = document.createElement("div");
    const acik = document.createElement("span"); //span
    const dvim = document.createElement("div");
    const bf = document.createElement("span");
    fucks.innerHTML = '<span class="aaciklama">' + x.Adres + "</span>";
    let kordinatBilgi = x.LokasyonX + "," + x.LokasyonY;
    bf.innerHTML =
      '<div class="bolge"><span class="bolgeAdiUst">' +
      x.Bolge +
      "</span>" +
      '<span class="eczAd">' +
      x.Adi +
      "</span>" +
      '<span class="eczTel">' +
      x.Telefon +
      "</div>";
    if (!x.BolgeAciklama == "") {
      acik.innerHTML =
        "Bölge Açıklama : " +
        x.BolgeAciklama +
        '<span class="ds">Kordinatlar : ' +
        kordinatBilgi +
        "</span>";
    } else {
      acik.innerHTML =
        '<span class="ds">Kordinatlar : ' + kordinatBilgi + "</span>";
    }
    let icerik = document.querySelector(".ecz");
    icerik.appendChild(dvim);
    dvim.appendChild(bf);
    dvim.appendChild(fucks);
    fucks.appendChild(acik);
    bf.setAttribute("class", "bold");
    fucks.setAttribute("class", "genis");
    dvim.setAttribute("class", "secilmemis");
  });

  const atcigerim=document.getElementById('aticeri').innerHTML=sonuc.length;

  function duzleyici() {
    let dinleyici2 = document.querySelector(".secili");
    if (dinleyici2 != null) {
      dinleyici2.setAttribute("class", "secilmemis");
    }
  }
  const dinleyici = document.querySelectorAll(".secilmemis");
  dinleyici.forEach(function (elem) {
    elem.addEventListener("click", function () {
      duzleyici();
      elem.setAttribute("class", "secili");
      setAttr(
        elem.children[1].children[1].innerHTML
          .split("Kordinatlar : ")[1]
          .substring(0, 19)
      );
      console.log(
        elem.children[1].children[1].innerHTML
          .split("Kordinatlar : ")[1]
          .substring(0, 19)
      );
      let topBolg = document.querySelector(".secili");
      let bolgeBilgi = document.querySelector(".bolgeAdiUst");
      if (
        elem.children[1].children[1].innerHTML
          .split("<spa")[0]
          .split("Bölge Açıklama : ")[1] != undefined
      ) {
        mapMetin.innerHTML =
          '<div class="adresbas"><div class="soltaraf"><div>Bölge : ' +
          topBolg.children[0].children[0].children[0].innerHTML +
          "</div>" +
          "<div>" +
          topBolg.children[0].children[0].children[1].innerHTML +
          "</div>" +
          "<div>" +
          topBolg.children[0].children[0].children[2].innerHTML +
          '</div>' +
          '<div>' +
          topBolg.children[1].children[0].innerHTML +
          '</div></div><div class="red"><span> Açıklama : <br>' +
          elem.children[1].children[1].innerHTML
            .split("<spa")[0]
            .split("Bölge Açıklama : ")[1] +
          "</span></div></div>";
      } else {
        mapMetin.innerHTML =
          '<div class="adresbas"><div class="soltaraf"><div>Bölge : ' +
          topBolg.children[0].children[0].children[0].innerHTML +
          "</div>" +
          "<div>" +
          topBolg.children[0].children[0].children[1].innerHTML +
          "</div>" +
          "<div>" +
          topBolg.children[0].children[0].children[2].innerHTML +
          "</div>" +
          '<div>' +
          topBolg.children[1].children[0].innerHTML +
          '</div>';
      }
      window.scrollTo(0,0); // For Chrome, Firefox, IE and Opera sayfa top'una git
    });
  });
  const listim = document.querySelectorAll(".bolgeAdiUst");
  listim.forEach((x) => {
    const option = document.createElement("option");
    let listHT = document.querySelector("#bolgeSec");
    option.innerHTML = x.innerHTML.split("<span ")[0];
    option.setAttribute("value", x.innerHTML);
    listHT.appendChild(option);
    console.clear();
  });
  const listM=document.getElementById('bolgeSec');  
  listM.addEventListener("change", function() {
      console.log(document.getElementById('bolgeSec').value);
});

const gelenBtn=document.querySelector('.sfrla');
gelenBtn.addEventListener('click', () => {
  listeyitemizle();
  git();
})

function listeyitemizle(){
  const listM=document.getElementById('bolgeSec');
  listM.value=listM[0].value;
  console.log(listM[0].innerHTML)
}



// function git() {
//   const element = document.getElementById(`"${buragit}"`);
//   element.scrollIntoView();
// }
  // return sonuc;
}
denemmeler();

// Bölgeleri Getirdim
// let f1=document.querySelector('.ecz');
// for(i=0;i<f1.childElementCount;i++){
//     console.log(f1.children[i].children[0].children[0].children[0].innerHTML);
// }

let macacustlink=document.getElementsByClassName("macacust")[0];
macacustlink.addEventListener("click", () => {
  window.open(document.querySelector(".link").getAttribute("href"),'_blank');
  console.log("biyerlere git");
})