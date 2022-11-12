async function denemmeler() {
    const deneme = await fetch('https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler');
    const sonuc = await deneme.json();
    //console.log(sonuc);

    

    const arametin = document.querySelector('.arametin');
    const arabuton = document.querySelector('.arabuton');
    //arabuton.addEventListener("click", yap);
    arametin.addEventListener("click", temizle);
    arabuton.addEventListener("click", setAttr);
    function yap() {
        const arananmetin = (arametin.value.toLowerCase());
        if (arananmetin != '') {
            console.log(arananmetin);
        }
    }
    function temizle() {
        arametin.value = '';
    }

    function setAttr(){
        if(!arametin.value==""){
            let kordinatim=arametin.value;
            let d1=kordinatim.split(",");
            //console.log(d1[0],d1[1]);
            let ss=document.querySelector('.map');
            let yazi=`https://maps.google.com/maps?q=${d1[0]},${d1[1]}&hl=es;z=14&output=embed`;
            let ss1=ss.children[0].setAttribute('src',yazi);
            //console.log(yazi);
        }
    }

    sonuc.forEach(x => {
        const fucks = document.createElement('span');
        const acik = document.createElement('span');
        const dvim = document.createElement('div');
        const bf = document.createElement('span');
        fucks.innerHTML = x.Adres;
        bf.innerHTML = x.Bolge + '<br>' + x.Adi + '<br> Telefon : ' + x.Telefon;
        if(!x.BolgeAciklama==""){
            acik.innerHTML = 'Bölge Açıklama : ' + x.BolgeAciklama + '<br> Kordinatlar : ' + x.LokasyonX + ',' + x.LokasyonY;
        }
        else{
            acik.innerHTML = 'Kordinatlar : ' + x.LokasyonX + ',' + x.LokasyonY;
        }
        let icerik = document.querySelector('.ecz');
        icerik.appendChild(dvim);
        dvim.appendChild(bf);
        dvim.appendChild(fucks);
        fucks.appendChild(acik);
        bf.setAttribute('class', 'bold');
        fucks.setAttribute('class', 'genis');
        dvim.setAttribute('class','secilmemis');
    })

    const dinleyici= document.querySelectorAll('.secilmemis');
    dinleyici.forEach(function(elem) {
        elem.addEventListener("click", function() {
            elem.setAttribute('class','secili')
        });
    });
    return sonuc;
}
denemmeler();





//veriler=denemmeler();
//veriler2=[];
//veriler.then((res) => {veriler2=(res);
//console.log(veriler2[0].LokasyonX+','+veriler2[0].LokasyonY);
//console.log(veriler2)
//});

