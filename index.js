async function denemmeler() {
    const deneme = await fetch('https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler');
    const sonuc = await deneme.json();
    //console.log(sonuc);

    const mapMetin=document.querySelector('.ecbiltutan');
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

    function setAttr(cord){
        let kordinatim=cord;
        let d1=kordinatim.split(",");
        //console.log(d1[0],d1[1]);
        let ss=document.querySelector('.map');
        let yazi=`https://maps.google.com/maps?q=${d1[0]},${d1[1]}&hl=es;z=14&output=embed`;
        ss.children[0].setAttribute('src',yazi);
        //console.log(yazi);
    }

    sonuc.forEach(x => {
        const fucks = document.createElement('span');
        const acik = document.createElement('span');
        const dvim = document.createElement('div');
        const bf = document.createElement('span');
        fucks.innerHTML = x.Adres;
        let kordinatBilgi=x.LokasyonX + ',' + x.LokasyonY;
        bf.innerHTML = '<span class="bolge">'+x.Bolge +'</span>' + '<span class="eczAd">'+x.Adi +'</span>' + '<span class="eczTel">'+x.Telefon +'</span>';
        if(!x.BolgeAciklama==""){
            acik.innerHTML = 'Bölge Açıklama : ' + x.BolgeAciklama + '<span class="ds">Kordinatlar : ' + kordinatBilgi+'</span>';
        }
        else{
            acik.innerHTML = '<span class="ds">Kordinatlar : ' + kordinatBilgi+'</span>';
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

    function duzleyici(){
        let dinleyici2=document.querySelector('.secili');
        if(dinleyici2!=null){
            dinleyici2.setAttribute('class','secilmemis');
        }
    }

    const dinleyici=document.querySelectorAll('.secilmemis');
    dinleyici.forEach(function(elem) {
        elem.addEventListener("click", function() {
            duzleyici(); 
            elem.setAttribute('class','secili');
            setAttr(elem.children[1].children[0].innerHTML.split('Kordinatlar : ')[1].substring(0,19));
            console.log(elem.children[1].children[0].innerHTML.split('Kordinatlar : ')[1].substring(0,19));
            let topBolg=document.querySelector('.secili');
            if(elem.children[1].children[0].innerHTML.split('<spa')[0].split('Bölge Açıklama : ')[1]!=undefined){
                mapMetin.innerHTML='<div class="adresbas"><div class="soltaraf"><div>Bölge : '+topBolg.children[0].children[0].innerHTML+'</div>'+'<div>Eczane İsmi : '+topBolg.children[0].children[1].innerHTML+'</div>'+'<div>'+topBolg.children[0].children[2].innerHTML+'</div></div><div class="red"><span> Açıklama : <br>'+elem.children[1].children[0].innerHTML.split('<spa')[0].split('Bölge Açıklama : ')[1]+'</span></div></div>';
            }
            else{
                mapMetin.innerHTML='<div class="adresbas"><div class="soltaraf"><div>Bölge : '+topBolg.children[0].children[0].innerHTML+'</div>'+'<div>Eczane İsmi : '+topBolg.children[0].children[1].innerHTML+'</div>'+'<div>'+topBolg.children[0].children[2].innerHTML+'</div>';
            }            
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera sayfa top'una git
        });
    });
    return sonuc;
}
denemmeler();