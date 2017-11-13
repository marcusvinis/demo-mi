<script>
 (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'http://web.archive.org/web/20161119102628/http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
}(document, 'script'));
</script>
<script type="text/javascript">
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') + 
'//web.archive.org/web/20161119102628/http://www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();
</script>
<!-- Se for GameBlast -->
<script type="text/javascript">
googletag.cmd.push(function() {
googletag.defineSlot('/1061411/GameBlast_300x250', [300, 250], 'div-gpt-ad-1386037874795-1').addService(googletag.pubads());
googletag.defineSlot('/1061411/GameBlast_300x250_2', [300, 250], 'div-gpt-ad-1386037874795-2').addService(googletag.pubads());
googletag.defineSlot('/1061411/GameBlast_728x90', [728, 90], 'div-gpt-ad-1386037874795-3').addService(googletag.pubads());
googletag.pubads().enableSingleRequest();
googletag.enableServices();
});
</script>
<script language="javascript" type="text/javascript">

var itensNoticia = new Array();
var itensDestaque = new Array();
var itensUltimosDestaques = new Array();
var listaTags = ['Wii','Wii U','DS','3DS'];
var listaColunas = ['Análises','Análise','Blast from the Past','Blast from Japan','Prévia','Discussão','Perfil','N-Blast Responde','Game Music','Blast from the Trash','Stage Select','Item Box','GameDev','Top 10','Xbox Chronicle','Developers','Blast Battle','Blast Up','Analógico','Fail','Guia DLC','Achievement Blast','Trophy Blast','PlayStation Chronicle','Nintendo Chronicle','Pokémon Blast','Blast Test','MythBlasters','Dicas e Truques','Chronicle','Ranking de Vendas','Future Blast','Blast Log','Hands-on','Iwata Asks','Plug and Blast','Random Blast','Entrevista','Publieditorial','Crônica','Resenha','Indie Blast','A Link to the Blast','~Notícia','Blast Files','Semana Blast','Jogos Gratuitos','Jogo do Mês','RPG Blast','Jogatina de FDS','Smash Blast','PromoBlast,','Live Blast'];

var urlSite = "http://web.archive.org/web/20161119102628/http://www.gameblast.com.br/";
var tagBusca = '';

//Verificando o site atual e definindo sua url




	//GameBlast
	var listaConsoles = ['Wii U', 'Wii', '3DS', 'DS', 'GB', 'GBA', 'GBC', 'GC', 'SNES', 'N64', 'NES', 'X360', 'XB', 'XBO', 'XBW', 'XBWP', 'PS4', 'PS3', 'PS2', 'PS', 'PSP', 'PSVita', 'PC', 'iOS', 'Android'];


/*
Realiza uma chamada JSON e recupera os itens de acordo com a url informada
strBlastId: url do feed JSON
tipo: tipo de item, define em qual variável o retorno será armazenado (0: notícia, 1:destaque, 2:últimos destaques)
*/
function getJsonFeed(strBlastId,tipo){	
	//Encapsulando chamada JSON com deferred
	chamada = $.Deferred(function (def) {
		$.ajax({
				url: strBlastId,
				type: 'get',
				dataType: "jsonp",
				async: true,
				success: function(json){
					$(json.feed.entry).each(function(i, entry){
						if(tipo==0){
							itensNoticia.push(entry);
						}
						else if(tipo==1){
							itensDestaque.push(entry);
						}
						else{
							itensUltimosDestaques.push(entry);
						}
					});
					def.resolve(); //Resolvendo o defered, dizendo que terminou a chamada JSON
				}
		})
	}).promise();
	return chamada;
}

//Ordena os itens de uma lista de posts em data decrescente
function ordenaItens(listaItens){
	listaItens.sort(function(x,y){
		var result = 0;
		if(x.published.$t > y.published.$t){
			result = -1;
		}
		else{
			result = 1;
		}
		return result;
	});
}



//Constroi visualmente a lista de notícias
function montaFeedNoticias(){
	chamada = $.Deferred(function (def) {
		//Chamando os feeds
		
		
		//Condição especial para o GameBlast
		// 3 itens para GB e NB, 2 itens para PB e XB
		
			chamada1 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.gameblast.com.br/feeds/posts/summary/-/~Not%C3%ADcia?max-results=5&alt=json',0);
					 chamada2 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.nintendoblast.com.br/feeds/posts/summary/-/~Not%C3%ADcia?max-results=3&alt=json',0);
					 chamada3 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.playstationblast.com.br/feeds/posts/summary/-/~Not%C3%ADcia?max-results=2&alt=json',0);
					 chamada4 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.xboxblast.com.br/feeds/posts/summary/-/~Not%C3%ADcia?max-results=2&alt=json',0);
		

		//Quando as duas chamadas assíncronas foram executadas, monta visualmente
		
		$.when(chamada1, chamada2, chamada3, chamada4).done(function() { 
		
		
			$('#teste-feed').append($(document.createElement('ul')).attr({'id':'listaNoticias'}));
			$('#carregando-noticias').remove();
			ordenaItens(itensNoticia);
			jQuery.each(itensNoticia,function(i,entry){
				var itemNoticia = $(document.createElement('li'));
				var linkNoticia = "";
				var urlImagemThumbnail = "";
				var identificacaoBlast = "";
				var linkComentariosFb = "";
				if(entry.media$thumbnail!=null){
					urlImagemThumbnail=entry.media$thumbnail.url;
				}
				var imgTag = $(document.createElement('img')).attr({'src':urlImagemThumbnail, 'class':'item-thumbnail'});
				jQuery.each(entry.link,function(i,url){
					if(url.rel=="alternate"){
						linkNoticia = url.href;
						if(linkNoticia.indexOf('gameblast')>0){
							identificacaoBlast = "<div class='gbicon'/>";
							itemNoticia.addClass('gbpost');
						}
						return false;
					}
				});
				itemNoticia.append("<a href='"+linkNoticia+"'><div class='item-content'><div class='item-thumbnail'><img src='"+urlImagemThumbnail+"' width='47'/><div class='item-icon'/></div><div class='item-title nocontent'>"+entry.title.$t +identificacaoBlast+" </div></div></div></a>");
				$('#listaNoticias').append(itemNoticia);
			});
		});
		def.resolve();
	}).promise();
	return chamada;
}


function getJsonFeedGameblast(strBlastId,array){	
	//Encapsulando chamada JSON com deferred
	chamada = $.Deferred(function (def) {
		$.ajax({
				url: strBlastId,
				type: 'get',
				dataType: "jsonp",
				async: true,
				success: function(json){
					$(json.feed.entry).each(function(i, entry){
						array.push(entry);
					});
					def.resolve(); //Resolvendo o defered, dizendo que terminou a chamada JSON
				}
		})
	}).promise();
	return chamada;
}
//Constroi visualmente a lista de notícias
function montaFeedNoticiasGameblast(url,box,site){
	chamada = $.Deferred(function (defObj) {
	var itens = new Array();
	//Chamando o feed
	chamada1 = getJsonFeedGameblast(url,itens);
	

	//Quando a chamada foi executada, monta visualmente
	$.when(chamada1).done(function() { 
		
		$(box).append($(document.createElement('ul')).attr({'id':'listaNoticias'}));
		$('#carregando-noticias').remove();
		ordenaItens(itens);
		jQuery.each(itens,function(i,entry){
			var itemNoticia = $(document.createElement('li'));
			var linkNoticia = "";
			var urlImagemThumbnail = "";
			var identificacaoBlast = "";
			var linkComentariosFb = "";
			if(entry.media$thumbnail!=null){
				urlImagemThumbnail=entry.media$thumbnail.url;
			}
			var imgTag = $(document.createElement('img')).attr({'src':urlImagemThumbnail, 'class':'item-thumbnail'});
			jQuery.each(entry.link,function(i,url){
				if(url.rel=="alternate"){
					linkNoticia = url.href;
					if(linkNoticia.indexOf('gameblast')>0){
                        identificacaoBlast = "<div class='gbicon'/>";
						itemNoticia.addClass('gbpost');
					}
					return false;
				}
			});
			itemNoticia.append("<a href='"+linkNoticia+"'><div class='item-content'><div class='item-thumbnail'><img src='"+urlImagemThumbnail+"' width='47'/><div class='item-icon'/></div><div class='item-title'>"+entry.title.$t +identificacaoBlast+" </div></div></div></a>");
			$('#teste-feed').css('min-height','100%');
			$(box+' #listaNoticias').append(itemNoticia);
            $(box).parent().next().children()[0].innerHTML = 'Ver mais no '+site;
  $(box).parent().next().children()[0].href = url.split('feeds')[0]+'search/label/~Not%C3%ADcia';
		});
		defObj.resolve();
	});
	
	}).promise();
	return chamada;
}


//Últimos Destaques e marcador de consoles - Páginas Index


           
//Últimos Destaques e marcador de consoles - Demais páginas
           
           

//Constroi visualmente os destaques da home
function montaFeedDestaques(){
    chamada = $.Deferred(function (def) {
		if($('#destaque0').length>0){
		//Chamando os feeds
		
		

		//Condição especial para o GameBlast
		// 3 itens para GB, 2 itens para NB, PB e XB
		
							   chamada1 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.gameblast.com.br/feeds/posts/summary/-/~Destaque?max-results=3&alt=json&start-index=2',1);
							   chamada2 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.nintendoblast.com.br/feeds/posts/summary/-/~Destaque?max-results=2&alt=json',1);
							   chamada3 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.playstationblast.com.br/feeds/posts/summary/-/~Destaque?max-results=2&alt=json',1);
							   chamada4 = getJsonFeed('http://web.archive.org/web/20161119102628/http://www.xboxblast.com.br/feeds/posts/summary/-/~Destaque?max-results=2&alt=json',1);
		

		//Quando as duas chamadas assíncronas foram executadas, monta visualmente
		
		$.when(chamada1, chamada2, chamada3, chamada4).done(function() { 
		
		
			ordenaItens(itensDestaque);
			jQuery.each(itensDestaque,function(i,entry){
				var destaque = $('#destaque'+(i+1));
				var linkDestaque = "";
				var urlImagem = "";
				var identificacaoBlast = "";
				if(entry.media$thumbnail!=null){
					urlImagem=entry.media$thumbnail.url;
				}
				jQuery.each(entry.link,function(i,url){
					if(url.rel=="alternate"){
						linkDestaque = url.href;
						if(linkDestaque.indexOf('gameblast')>0){
							identificacaoBlast = " <div class='gbicon'/>";
							destaque.addClass('gbpost');
						}
						return false;
					}
				});
				var tags = "";
				var coluna = "";
				jQuery.each(entry.category,function(i,obj){
					jQuery.each(listaConsoles,function(i,tag){
						if(obj.term == tag){
							if(obj.term == 'PSVita'){
								tags += "<div class='bigtag narrow'>PSV</div>";
							}
							else if(obj.term == 'Android'){
								tags += "<div class='bigtag narrow'>AND</div>";
							}
							else{
								tags += "<div class='bigtag'>"+obj.term+"</div>";
							}
						}
					});
					jQuery.each(listaColunas,function(i,tag){
						if(obj.term == tag){
							if((obj.term == 'Análises')||(obj.term == 'Análise')){
								coluna = 'Jogamos';
							} else if(obj.term == 'Prévia') {
								coluna = 'Vem aí';
							} else if(obj.term == '~Notícia') {
								coluna = 'Últimas';
							} else if(obj.term == 'N-Blast Responde'){
								coluna = 'Perguntas dos Leitores';
							} else if(obj.term == 'Blast Up'){
								coluna = 'Espaço do Leitor';
							} else if(obj.term == 'GameDev'){
								coluna = 'Desenvolvendo em XNA';
							} else if(obj.term == 'BlastCast '){
								coluna = 'Podcast';
                            } else if(obj.term == 'Jogos Gratuitos') {
								coluna = 'DiGrátis';
                            } else if(obj.term == 'Live Blast') {
								coluna = 'Livecast/Podcast';
							} else {
								coluna += obj.term;
							}
							return false;
						}
					});
					
				});
				if(tags.match(/bigtag/g)!=null){
					if(tags.match(/bigtag/g).length>1){
						tags = "<div class='bigtag narrow'>Multi</div>";
					}
				}
				
				if(urlImagem.indexOf('/s72-c/')>0){
				  urlImagem = urlImagem.replace('/s72-c/','/s300/');
				}
				if(urlImagem.indexOf('/w640-h300/')>0){
				  urlImagem = urlImagem.replace('/w640-h300/','/s300/');
				}
				if(urlImagem.indexOf('/w640-h300-no/')>0){
				  urlImagem = urlImagem.replace('/w640-h300-no/','/s300/');
				}
				if(entry.title.$t.length>80){
					entry.title.$t = entry.title.$t.substring(0,77)+"..."; 
				}
				destaque.find('.imgdestaque').css('background-image', "url( '"+urlImagem+"') ");
				destaque.children()[0].href = linkDestaque;
				destaque.find('a').append(tags);
				destaque.find('h1').html(entry.title.$t);
				destaque.find('h1').append(identificacaoBlast);
				destaque.find('.toptag').html(coluna);
			});
		});
		}
		def.resolve();
	}).promise();
	return chamada;
}
    	
//Faz com que a barra lateral acompanhe a rolagem da página
function fixaBarraLateral(){
	if($('#main-wrapper').height()>$('#sidebar-wrapper').height()){
		var $barraDireita   = $("#sidebar3"),
		rodape = $("#footer-wrapper").offset().top;
		var verificacao = false;
        
		if($('#infoautor').length > 0){
			verificacao = $(window).scrollTop() > (offsetBarraDireita.top-(14*5)+40+$("#sidebar-wrapper").offset().top);
		}
		else{
			verificacao = $(window).scrollTop() > (offsetBarraDireita.top-(14));
            if($("#sidebar3").css('position')=='static'){
            	offsetBarraDireita = $barraDireita.offset();
            }
		}
		if (verificacao){
			$barraDireita.css({'position':'fixed', 'top':'14px','width':'300px'})
		}else {
			 $barraDireita.css({'position':'static', 'top':'14px','width':'300px'})
		}
		if((($barraDireita.offset().top+$barraDireita.height())>rodape)&&($barraDireita.css('position')=='fixed')){
			$barraDireita.css({'position':'absolute', 'top':rodape-151-($barraDireita.height())})
                                                                                                       if(($barraDireita.offset().top+$barraDireita.height())>rodape){
              $barraDireita.css({'position':'absolute', 'top':rodape-261-($barraDireita.height())});
            }
		}
	}
}

                                //Inclui a sigla do console nos posts, no quadro acima da contagem de comentários
function montaIdentificacaoConsole(){
    if($('#tilebar').length>0){
	var listaTags = $('#marcadores_consoles li');
	var console = '';
	jQuery.each(listaTags,function(i,tag){
		jQuery.each(listaConsoles,function(i,cons){
			if(tag.innerHTML == cons){
                if(console.length > 1){
					console = 'Multi';
					return false;
				}
				else{
					console += cons;
				}
			}
		});
	});
	if(console.length > 1){
		if(console == 'Multi'){
			$('#tilebar').prepend("<a class='bigtag' href='#'>"+console+"</a>");
		}
		else{
			if(console == 'PSVita'){
				$('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/PSVita>PSV</a>");
            }
			else if(console == 'Android'){
				$('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/Android>AND</a>");
            }
			else if(console == 'Wii U'){
           $('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/Wii%20U>"+console+"</a>")
            }
            else{
			$('#tilebar').prepend("<a class='bigtag' href="+urlSite+"/search/label/"+console+">"+console+"</a>");
            }
		}
	}



    }
}


function montaListaVideos(){
	chamada = $.Deferred(function (def) {
		var thumbnail;
		var url;
		var cont = 1;

	


	

	<!-- Se for GameBlast -->
	$.ajax({
				url: 'http://web.archive.org/web/20161119102628/https://gdata.youtube.com/feeds/api/users/GameBlastTV/uploads?v=2&max-results=4',
				type: 'get',
				dataType: 'xml',
				async: true,
				success: function(xml){
					retorno = xml;
					$(xml).find('entry').each(function(){
						var titulo = $(this).find('title[type="plain"]').text();
						thumbnail = $(this).find('thumbnail[yt\\:name="mqdefault"]').attr('url');
						url = $(this).find('link[type="text/html"]').attr('href');
						//listaVideos.push('titulo:'+titulo+'\nthumbnail: '+thumbnail+'\nurl: '+url);
						var destaque = $('#feed-videos #destaque'+cont);
						destaque.find('.imgdestaque').css('background-image', "url( '"+thumbnail+"') ");
						destaque.find('.imgdestaque').css('height', "177px");
						destaque.children()[0].href = url;
						destaque.find('h1').html(titulo);
						cont++;
					});
	


				}
		});
		def.resolve();
	}).promise();
	return chamada;
}

function montaDestaqueGrande(){
	chamada = $.Deferred(function (def) {
		$.ajax({
		  url: urlSite+'/feeds/posts/summary/-/~Destaque?max-results=1&alt=json',
		  type: 'get',
		  dataType: "jsonp",
		  async: true,
		  success: function(json){
			$(json.feed.entry).each(function(i, entry){
				var destaque = $('#destaque0');
				var linkDestaque = "";
				var urlImagem = "";
				var identificacaoBlast = "";
				if(entry.media$thumbnail!=null){
					urlImagem=entry.media$thumbnail.url;
				}
				jQuery.each(entry.link,function(i,url){
					if(url.rel=="alternate"){
						linkDestaque = url.href;
						if(linkDestaque.indexOf('gameblast')>0){
							identificacaoBlast = " <div class='gbicon'/>";
							destaque.addClass('gbpost');
						}
						return false;
					}
				});
				var tags = "";
				var coluna = "";
				jQuery.each(entry.category,function(i,obj){
					jQuery.each(listaConsoles,function(i,tag){
						if(obj.term == tag){
							if(obj.term == 'PSVita'){
								tags += "<div class='bigtag narrow'>PSV</div>";
							}
							else if(obj.term == 'Android'){
								tags += "<div class='bigtag narrow'>AND</div>";
							}
							else{
								tags += "<div class='bigtag'>"+obj.term+"</div>";
							}
						}
					});
					jQuery.each(listaColunas,function(i,tag){
						if(obj.term == tag){
							if((obj.term == 'Análises')||(obj.term == 'Análise')){
								coluna = 'Jogamos';
							} else if(obj.term == 'Prévia') {
								coluna = 'Vem aí';
							} else if(obj.term == '~Notícia') {
								coluna = 'Últimas';
							} else if(obj.term == 'N-Blast Responde'){
								coluna = 'Perguntas dos Leitores';
							} else if(obj.term == 'Blast Up'){
								coluna = 'Espaço do Leitor';
							} else if(obj.term == 'GameDev'){
								coluna = 'Desenvolvendo em XNA';
							} else if(obj.term == 'BlastCast '){
								coluna = 'Podcast';
                            } else if(obj.term == 'Jogos Gratuitos') {
								coluna = 'DiGrátis';
                            } else if(obj.term == 'Live Blast') {
								coluna = 'Livecast/Podcast';
							} else {
								coluna += obj.term;
							}
							return false;
						}
					});
					
				});
				if(tags.match(/bigtag/g)!=null){
					if(tags.match(/bigtag/g).length>1){
						tags = "<div class='bigtag narrow'>Multi</div>";
					}
				}
			  if(urlImagem.indexOf('/s72-c/')>0){
				  urlImagem = urlImagem.replace('/s72-c/','/s668/');
				}
				if(urlImagem.indexOf('/w640-h300/')>0){
				  urlImagem = urlImagem.replace('/w640-h300/','/s668/');
				}
				if(urlImagem.indexOf('/w640-h300-no/')>0){
					  urlImagem = urlImagem.replace('/w640-h300-no/','/s668/');
				}
				if(entry.title.$t.length>80){
					entry.title.$t = entry.title.$t.substring(0,77)+"..."; 
				}
				destaque.find('.imgdestaquegrande').css('background-image',"url('"+urlImagem+"')");				
				destaque.children()[0].href = linkDestaque;
				destaque.find('a').append(tags);
				destaque.find('h1').html(entry.title.$t);
				destaque.find('h1').append(identificacaoBlast);
				destaque.find('.toptag').html(coluna);
			});
		  }
		});
		def.resolve();
	}).promise();
	return chamada;
}


function montaDestaqueRevista(){	
	chamada = $.Deferred(function (def) {
		$.ajax({
		  
		  url: 'http://web.archive.org/web/20161119102628/http://www.gameblast.com.br/feeds/posts/summary/-/Revista?max-results=1&alt=json',
		  
		  type: 'get',
		  dataType: "jsonp",
		  async: true,
		  success: function(json){
			$(json.feed.entry).each(function(i, entry){
			  var destaque = $('#destaque_revista #destaqueR');
			  var linkDestaque = "";
			  var urlImagem = "";
			  if(entry.media$thumbnail!=null){
				urlImagem=entry.media$thumbnail.url;
			  }
			  jQuery.each(entry.link,function(i,url){
				if(url.rel=="alternate"){
				  linkDestaque = url.href;
				  return false;
				}
			  });	
			  if(urlImagem.indexOf('/s72-c/')>0){
				urlImagem = urlImagem.replace('/s72-c/','/s668/');
			  }
			  if(urlImagem.indexOf('/w640-h300/')>0){
				urlImagem = urlImagem.replace('/w640-h300/','/s668/');
			  }
			  if(urlImagem.indexOf('/w640-h300-no/')>0){
				urlImagem = urlImagem.replace('/w640-h300-no/','/s668/');
			  }
			  destaque.find('.imgdestaquegrande').css('background-image',"url('"+urlImagem+"')");
			  destaque.children()[0].href = linkDestaque;
			  destaque.find('h1').html(entry.title.$t);
			});
		  }
		});
		def.resolve();
	}).promise();
	return chamada;
}

//Últimos Destaques e marcador de consoles - Páginas Index


           
//Últimos Destaques e marcador de consoles - Demais páginas
     

//Inicializa as várias funções após o carregamento da página
$(document).ready(function () {
	var chamadaNoticia,chamadaRevista,chamadaDestaqueGrande,chamadaDestaques;
	
	
		chamadaDestaqueGrande = montaDestaqueGrande();
	
	
	
	
		
		
			if(chamadaDestaqueGrande == null){
			chamadaNoticia = montaFeedNoticias();
			}
			else{
				$.when(chamadaDestaqueGrande).done(function() { 
					chamadaNoticia = montaFeedNoticias();
				});
			}
		
	
	
		$.when(chamadaNoticia).done(function() { 
			chamadaDestaques = montaFeedDestaques();
		});
		$.when(chamadaDestaques).done(function() { 
			montaDestaqueRevista();
			montaListaVideos();
		});
	
	
    offsetBarraDireita = $("#sidebar3").offset();
    $(window).scroll(function() {
		fixaBarraLateral();
	});
});
</script>