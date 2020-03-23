function animations() {

}
animations.prototype={
    constructor:animations(),
    animeblockdown:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:200,
            translateX:0,
            duration:1000,
            easing:'linear'
        });
    },
    animeblock:function (nmrdublock) { //pour animer lire dire///////////////////////////////////
        anime({
            targets:document.getElementById('block'+(nmrdublock)),
            translateY:[{value:300,duration:500},{value: 0}],
            translateX: 0,
             opacity:1,
            borderColor:[{value:'#8affb1',duration:800},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#8affb1',duration:800},{
                value: '#ffffff'
            }],
        });
    },

    animeenrg:function(bloc,enrg){ ////////////////////////////////////////////
        anime({
            targets:document.getElementById('enreg'+(enrg+2)+'block'+bloc),
            //translateY:20,
            //  translateX: 0,
            opacity:1,
            borderColor:[{value:"#ffda06",duration:500},{
                value: '#000000'
            }]
        });
    },

    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500},
                {value: 20,duration: 500}
            ],
            translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500},
                {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500}
            ]

        });
    },
    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:a,
            width:[{value:21 ,duration:500},
                {value: 20}
            ],
            height:[{value:21,duration:500},
                {value: 20}],
            backgroundColor:[{value:color,
                duration:500,},
                {
                    value: '#ffffff'
                }]
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
        anime({
            targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
            borderTopColor:borderColor,
        });
    },


    animrech1:function(x) { /////////////////////////////////////////////////////////////////////
        anime({
            targets:x,
            /*borderColor:[{value:'#2910ff',
                duration:1000,value:'#000000'}]*/
            borderColor:[{value:'#ff053f',duration:700},{
                value: '#000000'
            }],
            backgroundColor:[{value:"#2910ff",duration:700},{
                value: '#ffffff'
            }]
        })

    },

    animrech2:function(x) { /////////////////////////////////////////////////////////////////
        anime({
            targets:x,
            /*borderColor:[{value:'#2910ff',
                duration:1000,value:'#000000'}]*/
            borderColor:[{value:"#06ff00",duration:700},{
                value: '#06ff00'
            }],
            backgroundColor:[{value:"#06ff00",duration:700},{
                value: '#06ff00'
            }]
        })

    }
};





//===========================================================================================================




function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}

//==================================================================================================================



















class Entete{
    constructor(nbBloc,tailleMax)
    {
        this.nbBloc=nbBloc;//nbbloc utilisé pour donner l'aire qu on ajoute des bloc avec l insertion
        this.tailleMax=tailleMax;
    }
}



//=========================================================================================================

class Bloc{
    constructor(information,tailleMax){
        this.information=information;
        this.tailleMax=tailleMax;
    }

    insertionBloc(info,i){
        var a=[];
        var x=this.information.length;
        var insertion=false;
        while ((x<this.tailleMax)&&(i<info.length)){
            this.information[x]=info[i];
            x++;
            i++;
        }
        if(i>=info.length){
            insertion=true;
        }
        a.push(insertion);
        a.push(i);
        return a;

    }

    blocPlein(){
        var v=false;
        if(this.information.length==this.tailleMax){
            v=true;
        }
        else{
            v=false;
        }
        return v;
    }

    premierCaseVide(){
        return(this.information.length)


    }





}

//=====================================================================================================

class Enrg {
    constructor(cle,eff,info){
        this.cle=cle;
        this.eff=eff;
        this.info=info;
        this.taille=this.info.length+3;

    }
    concatiner() //radha array
    {
        var chain=[];
        chain.push(this.taille);
        chain.push(this.cle);
        chain.push(this.eff);
        for(var i=0;i<this.info.length;i++){
            chain.push(this.info.charAt(i));
        }
        return chain;
    }




}


//======================================================================================================

class TObVC{
    constructor(tete,tabBloc){
        this.tete=tete;
        this.tabBloc=tabBloc;
    }

     lireDir(i){
       // let a=new animations();
        //a.animeblockdown(i);
        return (this.tabBloc[i]);
    }


    ecrireDir(buf,i){
        this.tabBloc[i]=buf;
    }





    miseajourEntet(){
        this.tete.nbBloc=this.premierBlocNonPlein()+1;
    }

    premierBlocNonPlein(){ //indice du premier bloc non plein
        var i=0;
        var trouv=false;
        while ( trouv==false && i<this.tabBloc.length ){
            if (this.tabBloc[i].blocPlein()==false){
                trouv=true;
            }
            else{
                i++;
            }
        }
        if (i>=this.tabBloc.length){i=(-1);}
        return i;
    }


     restcolorsenrg(){
        var i=0;
        var j=0;
        var n;
        while (i<this.tabBloc.length){
            for(j=0;j<this.tete.tailleMax;j++){
                n=document.getElementById('enreg'+(j+1)+'block'+i);
                n.style.borderColor="#000000";
                n.style.backgroundColor="#ffffff";
            }
            i++;

        }

    }



    async animeInsertion(bloc,enrg,chain){ //bloc et enrg des indice chain est l'information
        var anm=new animations();
        var o=0;
        var idbloc='block'+bloc;
       while (o<chain.length){
            var idenrg='enreg'+(enrg+1)+'block'+bloc;

            var f= document.getElementById(idbloc);
           anm.animeblock(bloc);

            var n=document.getElementById(idenrg);
           var u=this.tabBloc[bloc].information[enrg];

            n.innerHTML+='<p>'+u+'</p>';
            await sleep(200);
            anm.animeenrg(bloc,enrg);
            await sleep(200);
            enrg++;
            if(enrg>=this.tete.tailleMax){
                enrg=0;
                bloc++;

            }
            o++;
        }




    }

    async insertion(cle,info) {

        this.restcolorsenrg();
        var enr = new Enrg(cle, 0, info);
        var chain = enr.concatiner();
        var i = 0;
        var j = 0;
        var h = 0;
        var insert = false;
        var buff;

        var x = this.premierBlocNonPlein();
        var y=x;


        j = this.tabBloc[x].premierCaseVide();
        var z=j;
        while ((i < chain.length) && (insert == false)) {
            this.tabBloc[x].information[j] = chain[i];
            j++;
            i++;
            if (i >= chain.length) {
                insert = true;
            } else if (j >= this.tabBloc[x].tailleMax) {

                j = 0;

                x++;


            }

        }
        this.miseajourEntet();
        await this.animeInsertion(y,z,chain);






        var bk=[y,z];
        return(bk);






    }


  async  animerech(bloc,enrg){ //les coordonné d element qu'on cherche
     var i=0;
     var j=0;
     var h=0;
     var n;
     var a=new  animations();
     this.restcolorsenrg();
     while (i<bloc){
         for(j=0;j<this.tete.tailleMax;j++){
         n=document.getElementById('enreg'+(j+1)+'block'+i);
             a.animrech1(n);
             await sleep(500);
         }
         i++;

     }

         for(j=0;j<enrg;j++){
             n=document.getElementById('enreg'+(j+1)+'block'+bloc);
             a.animrech1(n);
             await sleep(500);
         }





     var y;
     var x=enrg+this.tabBloc[bloc].information[enrg];
      y=x-this.tete.tailleMax;

      if(x>this.tete.tailleMax){
      for(j=enrg;j<this.tete.tailleMax;j++){
            n=document.getElementById('enreg'+(j+1)+'block'+bloc);
            a.animrech2(n);
            await sleep(500);

        }


        for(h=0;h<y;h++){
            n=document.getElementById('enreg'+(h+1)+'block'+(bloc+1));
            a.animrech2(n);
            await sleep(500);
        }
      }
      else {
          for(j=enrg;j<x;j++){
              n=document.getElementById('enreg'+(j+1)+'block'+bloc);
              a.animrech2(n);
              await sleep(500);

          }

      }




    return x;

    }

    recherch(cle){
        var i=0;
        var j=0;
        var h=0;
        var positiondeENRGdansBLOC;
        var trouv=false;
        var positionDeBloc=0;



        while ((i<this.tete.nbBloc) && (trouv==false) ){
            var taille=this.tabBloc[i].information[j];
            if (taille==undefined){
                break;
            }
            else {
                if ((j + 1) < this.tabBloc[i].tailleMax) {
                    if (cle == this.tabBloc[i].information[j + 1]) {
                        trouv = true;
                    } else {
                        j = j + taille;
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                    }
                    positiondeENRGdansBLOC = j;
                } else {

                    positiondeENRGdansBLOC = j;
                    j = 0;
                    if (cle == this.tabBloc[i + 1].information[j]) {
                        trouv = true;
                    } else {

                        j = j + taille;
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                    }

                }
            }

        }





       if(trouv==true){
        if(positiondeENRGdansBLOC+2>=this.tete.tailleMax){
            var l=positiondeENRGdansBLOC+2-this.tete.tailleMax;
            if(this.tabBloc[i+1].information[l]==1){
                trouv=false;
            }
        }
        else {
            if(this.tabBloc[i].information[positiondeENRGdansBLOC+2]==1){
                trouv=false;

            }


        }
        }
       else {
           positiondeENRGdansBLOC=-1;
           positionDeBloc=-1;

       }

        var a=[trouv,positionDeBloc,positiondeENRGdansBLOC];
       if(a[0]==true){
           this.animerech(a[1],a[2]);
       }
       else{
           alert("l'enrg n'existe pas");
       }
        return a;
    }


 async  animerech2(bloc,enrg){ //les coordonné d element qu'on cherche
        var i=0;
        var j=0;
        var h=0;
        var n;
        var a=new  animations();
        this.restcolorsenrg();
        while (i<bloc){
            for(j=0;j<this.tete.tailleMax;j++){
                n=document.getElementById('enreg'+(j+1)+'block'+i);
                a.animrech1(n);
                await sleep(100);
            }
            i++;

        }

        for(j=0;j<enrg;j++) {
            n = document.getElementById('enreg' + (j + 1) + 'block' + bloc);
            a.animrech1(n);
            await sleep(100);
        }

    }


    recherche2(cle){
        var i=0;
        var j=0;
        var h=0;
        var positiondeENRGdansBLOC;
        var trouv=false;
        var positionDeBloc=0;
        while ((i<this.tete.nbBloc) && (trouv==false) ){
            var taille=this.tabBloc[i].information[j];
            if (taille==undefined){
                break;
            }
            else {
                if ((j + 1) < this.tabBloc[i].tailleMax) {
                    if (cle == this.tabBloc[i].information[j + 1]) {
                        trouv = true;
                    } else {
                        j = j + taille;
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                    }
                    positiondeENRGdansBLOC = j;
                } else {

                    positiondeENRGdansBLOC = j;
                    j = 0;
                    if (cle == this.tabBloc[i + 1].information[j]) {
                        trouv = true;
                    } else {

                        j = j + taille;
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                    }

                }
            }

        }
        if(trouv==true){
            if(positiondeENRGdansBLOC+2>=this.tete.tailleMax){
                var l=positiondeENRGdansBLOC+2-this.tete.tailleMax;
                if(this.tabBloc[i+1].information[l]==1){
                    trouv=false;
                }
            }
            else {
                if(this.tabBloc[i].information[positiondeENRGdansBLOC+2]==1){
                    trouv=false;

                }


            }
        }
        else {
            positiondeENRGdansBLOC=-1;
            positionDeBloc=-1;

        }

        var a=[trouv,positionDeBloc,positiondeENRGdansBLOC];
       if(a[0]==true){
            this.animerech2(a[1],a[2]);
        }
        else{
            alert("l'enrg n'existe pas");
        }
        return a;
    }




    async  animesup(bloc,enrg){        /////akhdam recherche wahdokhra  b animation wahdokhra dir biha la suppression
        var i=0;
        var j=0;
        var z;
        var x=this.tabBloc[bloc].information[enrg]+enrg;
        var y=x-this.tete.tailleMax;
        var n;
        z=x;
        if(x>=this.tete.tailleMax){
            z=x-y;
        }
        for(j=enrg;j<z;j++){
            n=document.getElementById('enreg'+(j+1)+'block'+(bloc));
            n.style.backgroundColor="#ff0500"
            await sleep(200)
        }
        if(x>=this.tete.tailleMax){
            for(j=0;j<y;j++){
                n=document.getElementById('enreg'+(j+1)+'block'+(bloc+1));
                n.style.backgroundColor="#ff0500"
                await sleep(200)

            }
        }

    }


   async suprimer(cle){
        var x=this.recherche2(cle);
        await sleep(1000);
        if(x[0]==true){
            var a=x[1];//bloc
            var b=x[2]+2;//eff dans enrg
            if(b>=this.tabBloc[a].tailleMax){
                this.tabBloc[a+1].information[b-this.tabBloc[a].tailleMax]=1;
                var idenrg='enreg'+(b-this.tabBloc[a].tailleMax+1)+'block'+(a+1);
                var n=document.getElementById(idenrg);
                n.innerHTML+='<p>'+1+'</p>';

            }
            else
            {
                this.tabBloc[a].information[b]=1;
                var idenrg='enreg'+(b+1)+'block'+(a);
                var n=document.getElementById(idenrg);
                n.innerHTML='<p>'+1+'</p>';
            }
            this.animesup(x[1],x[2]);
        }
    }



    alloc_bloc(p) {
        let divfichier=document.getElementById('TObVC');
        let divblock=document.createElement('div');
        divblock.id='block'+(p);
        divblock.className='Tblock';
        divfichier.appendChild(divblock);
        for (let i=1;i<=this.tete.tailleMax;i++){
            let divenreg=document.createElement('div');
            divenreg.id='enreg'+i+'block'+(p);//enrg radha case fe enreg
            divenreg.className='Tenreg';
            divblock.appendChild(divenreg);
        }
       /* let divtaille=document.createElement('div');
        divtaille.className='casevide';
        divtaille.id='casevide'+(p+1);
        divtaille.innerHTML='<P>0</p>';
        divblock.appendChild(divtaille);
        //return this.tete(1)+1;*/


    }


  /* chargementInitial(){

      //  this.alloc_bloc(0);

       fich.insertion(5,"yrrdrsq");
        fich.insertion(45,"uyijihu");
         fich.insertion(78,"xcbnd");
        // fich.insertion(12,"fewsd");
        fich.insertion(9,"ohyjmo");
        // fich.insertion(91,"zzzzzz");
      /* for(var t=1;t<=this.tete.nbBloc;t++){
           this.alloc_bloc(t);
       }

    }*/














}





var t=new Entete(0,10);
var inf=[];
var inf2=[];
var inf3=[];
var inf4=[];
var inf5=[];
var inf6=[];
var inf7=[];
var inf8=[];
var inf9=[];
var inf10=[];
var inf11=[];

var bloc=new Bloc(inf,10);
var bloc2=new Bloc(inf2,10);
var bloc3=new Bloc(inf3,10);
var bloc4=new Bloc(inf4,10);
var bloc5=new Bloc(inf5,10);
var bloc6=new Bloc(inf6,10);
var bloc7=new Bloc(inf7,10);
var bloc8=new Bloc(inf8,10);
var bloc9=new Bloc(inf9,10);
var bloc10=new Bloc(inf10,10);
var bloc11=new Bloc(inf11,10);
var tabbloc=[];

tabbloc.push(bloc);

tabbloc.push(bloc2);
tabbloc.push(bloc3);
tabbloc.push(bloc4);
tabbloc.push(bloc5);
tabbloc.push(bloc6);
tabbloc.push(bloc7);
tabbloc.push(bloc8);
tabbloc.push(bloc9);
tabbloc.push(bloc10);





fich=new TObVC(t,tabbloc);


/*fich.insertion(12,'jjjjkjjjj');
fich.insertion(16,"hhhhhhh")*/
for(var t=0;t<fich.tabBloc.length;t++){
    fich.alloc_bloc(t);
}

function insere() {

        let s=prompt("Veuillez tapez l'enregitrement a inserer:");
        let a=prompt('Veuillez tapez sa cle:');
        fich.insertion(a,s);



}
function rech() {
    if (fich.tete.nbBloc!=0){
        let a=prompt('Veuillez tapez la cle a rechercher:');
        fich.recherch(a);
    }
    else {
        alert("Le fichier est vide");
    }
}
function supp() {
    if (fich.tete.nbBloc!=0){
        let s=prompt("Veuillez tapez l'enregitrement a supprimer:");

        fich.suprimer(s);
    }
    else {
        alert("Le fichier est vide");
    }

}

document.getElementById('inserer').onclick=insere;
document.getElementById('rechercher').onclick=rech;
document.getElementById('supprimer').onclick=supp;
