/*! @live-codes/nim-wasm - MIT. IIFE build, sets self.nimWasm.
 *  importScripts('nim-wasm.global.js') then self.nimWasm.createCompiler({ baseUrl }).
 *  The Nim compiler is not bundled: it is fetched from baseUrl at runtime. This does bundle the Clang
 *  toolchain, through @live-codes/clang-wasm (MIT) - and so @wasm-idle/llvm-core (MIT AND Apache-2.0
 *  WITH LLVM-exception), @bjorn3/browser_wasi_shim (MIT OR Apache-2.0) and fflate (MIT) with it. */
var nimWasm=(()=>{var c_=Object.defineProperty;var xs=Object.getOwnPropertyDescriptor;var ws=Object.getOwnPropertyNames;var Ls=Object.prototype.hasOwnProperty;var Rs=(t,e)=>()=>(t&&(e=t(t=0)),e);var f_=(t,e)=>{for(var n in e)c_(t,n,{get:e[n],enumerable:!0})},Cs=(t,e,n,_)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ws(e))!Ls.call(t,i)&&i!==n&&c_(t,i,{get:()=>e[i],enumerable:!(_=xs(e,i))||_.enumerable});return t};var vs=t=>Cs(c_({},"__esModule",{value:!0}),t);var Kr={};f_(Kr,{AsyncCompress:()=>Bs,AsyncDecompress:()=>$s,AsyncDeflate:()=>Ur,AsyncGunzip:()=>Gr,AsyncGzip:()=>Bs,AsyncInflate:()=>C_,AsyncUnzipInflate:()=>no,AsyncUnzlib:()=>Br,AsyncZipDeflate:()=>qs,AsyncZlib:()=>Xs,Compress:()=>T_,DecodeUTF8:()=>zs,Decompress:()=>A_,Deflate:()=>Fe,EncodeUTF8:()=>Ys,FlateErrorCode:()=>Gs,Gunzip:()=>Rt,Gzip:()=>T_,Inflate:()=>Re,Unzip:()=>to,UnzipInflate:()=>eo,UnzipPassThrough:()=>Yr,Unzlib:()=>vt,Zip:()=>Js,ZipDeflate:()=>Ks,ZipPassThrough:()=>Zn,Zlib:()=>I_,compress:()=>ks,compressSync:()=>g_,decompress:()=>Vs,decompressSync:()=>js,deflate:()=>Fr,deflateSync:()=>tt,gunzip:()=>Hr,gunzipSync:()=>Ct,gzip:()=>ks,gzipSync:()=>g_,inflate:()=>v_,inflateSync:()=>Gn,strFromU8:()=>D_,strToU8:()=>an,unzip:()=>_o,unzipSync:()=>ro,unzlib:()=>kr,unzlibSync:()=>Mt,zip:()=>Zs,zipSync:()=>Qs,zlib:()=>Ws,zlibSync:()=>S_});function un(t,e){return typeof t=="function"&&(e=t,t={}),this.ondata=e,t}function Fr(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[On],function(_){return dn(tt(_.data[0],_.data[1]))},0,n)}function tt(t,e){return fn(t,e||{},0,0)}function v_(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[Pn],function(_){return dn(Gn(_.data[0],N_(_.data[1])))},1,n)}function Gn(t,e){return et(t,{i:2},e&&e.out,e&&e.dictionary)}function ks(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[On,vr,function(){return[g_]}],function(_){return dn(g_(_.data[0],_.data[1]))},2,n)}function g_(t,e){e||(e={});var n=Dn(),_=t.length;n.p(t);var i=fn(t,e,w_(e),8),r=i.length;return b_(i,e),J(i,r-8,n.d()),J(i,r-4,_),i}function Hr(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[Pn,Mr,function(){return[Ct]}],function(_){return dn(Ct(_.data[0],_.data[1]))},3,n)}function Ct(t,e){var n=x_(t);return n+8>t.length&&R(6,"invalid gzip data"),et(t.subarray(n,-8),{i:2},e&&e.out||new H(Or(t)),e&&e.dictionary)}function Ws(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[On,Dr,function(){return[S_]}],function(_){return dn(S_(_.data[0],_.data[1]))},4,n)}function S_(t,e){e||(e={});var n=Ot();n.p(t);var _=fn(t,e,e.dictionary?6:2,4);return L_(_,e),J(_,_.length-4,n.d()),_}function kr(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),Un(t,e,[Pn,Pr,function(){return[Mt]}],function(_){return dn(Mt(_.data[0],N_(_.data[1])))},5,n)}function Mt(t,e){return et(t.subarray(R_(t,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function Vs(t,e,n){return n||(n=e,e={}),typeof n!="function"&&R(7),t[0]==31&&t[1]==139&&t[2]==8?Hr(t,e,n):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?v_(t,e,n):kr(t,e,n)}function js(t,e){return t[0]==31&&t[1]==139&&t[2]==8?Ct(t,e):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?Gn(t,e):Mt(t,e)}function an(t,e){if(e){for(var n=new H(t.length),_=0;_<t.length;++_)n[_]=t.charCodeAt(_);return n}if(Tr)return Tr.encode(t);for(var i=t.length,r=new H(t.length+(t.length>>1)),s=0,o=function(l){r[s++]=l},_=0;_<i;++_){if(s+5>r.length){var a=new H(s+8+(i-_<<1));a.set(r),r=a}var d=t.charCodeAt(_);d<128||e?o(d):d<2048?(o(192|d>>6),o(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|t.charCodeAt(++_)&1023,o(240|d>>18),o(128|d>>12&63),o(128|d>>6&63),o(128|d&63)):(o(224|d>>12),o(128|d>>6&63),o(128|d&63))}return Ue(r,0,s)}function D_(t,e){if(e){for(var n="",_=0;_<t.length;_+=16384)n+=String.fromCharCode.apply(null,t.subarray(_,_+16384));return n}else{if(y_)return y_.decode(t);var i=Wr(t),r=i.s,n=i.r;return n.length&&R(8),r}}function Zs(t,e,n){n||(n=e,e={}),typeof n!="function"&&R(7);var _={};M_(t,"",_,e);var i=Object.keys(_),r=i.length,s=0,o=0,a=r,d=new Array(r),l=[],c=function(){for(var m=0;m<l.length;++m)l[m]()},p=function(m,A){Dt(function(){n(m,A)})};Dt(function(){p=n});var f=function(){var m=new H(o+22),A=s,b=o-s;o=0;for(var E=0;E<a;++E){var u=d[E];try{var g=u.c.length;Rn(m,o,u,u.f,u.u,g);var h=30+u.f.length+on(u.extra),y=o+h;m.set(u.c,y),Rn(m,s,u,u.f,u.u,g,o,u.m),s+=16+h+(u.m?u.m.length:0),o=y+g}catch(S){return p(S,null)}}P_(m,s,d.length,b,A),p(null,m)};r||f();for(var T=function(m){var A=i[m],b=_[A],E=b[0],u=b[1],g=Dn(),h=E.length;g.p(E);var y=an(A),S=y.length,N=u.comment,x=N&&an(N),M=x&&x.length,W=on(u.extra),Y=u.level==0?0:8,k=function(L,B){if(L)c(),p(L,null);else{var D=B.length;d[m]=nt(u,{size:h,crc:g.d(),c:B,f:y,m:x,u:S!=A.length||x&&N.length!=M,compression:Y}),s+=30+S+W+D,o+=76+2*(S+W)+(M||0)+D,--r||f()}};if(S>65535&&k(R(11,0,1),null),!Y)k(null,E);else if(h<16e4)try{k(null,tt(E,u))}catch(L){k(L,null)}else l.push(Fr(E,u,k))},I=0;I<a;++I)T(I);return c}function Qs(t,e){e||(e={});var n={},_=[];M_(t,"",n,e);var i=0,r=0;for(var s in n){var o=n[s],a=o[0],d=o[1],l=d.level==0?0:8,c=an(s),p=c.length,f=d.comment,T=f&&an(f),I=T&&T.length,m=on(d.extra);p>65535&&R(11);var A=l?tt(a,d):a,b=A.length,E=Dn();E.p(a),_.push(nt(d,{size:a.length,crc:E.d(),c:A,f:c,m:T,u:p!=s.length||T&&f.length!=I,o:i,compression:l})),i+=30+p+m+b,r+=76+2*(p+m)+(I||0)+b}for(var u=new H(r+22),g=i,h=r-i,y=0;y<_.length;++y){var c=_[y];Rn(u,c.o,c,c.f,c.u,c.c.length);var S=30+c.f.length+on(c.extra);u.set(c.c,c.o+S),Rn(u,i,c,c.f,c.u,c.c.length,c.o,c.m),i+=16+S+(c.m?c.m.length:0)}return P_(u,i,_.length,h,g),u}function _o(t,e,n){n||(n=e,e={}),typeof n!="function"&&R(7);var _=[],i=function(){for(var m=0;m<_.length;++m)_[m]()},r={},s=function(m,A){Dt(function(){n(m,A)})};Dt(function(){s=n});for(var o=t.length-22;se(t,o)!=101010256;--o)if(!o||t.length-o>65558)return s(R(13,0,1),null),i;var a=we(t,o+8);if(a){var d=a,l=se(t,o+16),c=se(t,o-20)==117853008;if(c){var p=se(t,o-12);c=se(t,p)==101075792,c&&(d=a=se(t,p+32),l=se(t,p+48))}for(var f=e&&e.filter,T=function(m){var A=jr(t,l,c),b=A[0],E=A[1],u=A[2],g=A[3],h=A[4],y=A[5],S=Vr(t,y);l=h;var N=function(M,W){M?(i(),s(M,null)):(W&&(r[g]=W),--a||s(null,r))};if(!f||f({name:g,size:E,originalSize:u,compression:b}))if(!b)N(null,Ue(t,S,S+E));else if(b==8){var x=t.subarray(S,S+E);if(u<524288||E>.8*u)try{N(null,Gn(x,{out:new H(u)}))}catch(M){N(M,null)}else _.push(v_(x,{size:u},N))}else N(R(14,"unknown compression type "+b,1),null);else N(null,null)},I=0;I<d;++I)T(I)}else s(null,{});return i}function ro(t,e){for(var n={},_=t.length-22;se(t,_)!=101010256;--_)(!_||t.length-_>65558)&&R(13);var i=we(t,_+8);if(!i)return{};var r=se(t,_+16),s=se(t,_-20)==117853008;if(s){var o=se(t,_-12);s=se(t,o)==101075792,s&&(i=se(t,o+32),r=se(t,o+48))}for(var a=e&&e.filter,d=0;d<i;++d){var l=jr(t,r,s),c=l[0],p=l[1],f=l[2],T=l[3],I=l[4],m=l[5],A=Vr(t,m);r=I,(!a||a({name:T,size:p,originalSize:f,compression:c}))&&(c?c==8?n[T]=Gn(t.subarray(A,A+p),{out:new H(f)}):R(14,"unknown compression type "+c):n[T]=Ue(t,A,A+p))}return n}var hr,Fs,H,Le,Qn,Cn,vn,qn,gr,Ir,E_,wt,Sr,Ar,p_,Jn,Qe,Z,Oe,en,Z,Z,Z,Z,Ln,Z,yr,Er,Nr,br,Nt,Pe,bt,Mn,Ue,Gs,xr,R,et,je,xn,xt,Lt,h_,wn,Pt,m_,wr,ze,Lr,Rr,Dn,Ot,fn,nt,mr,Et,Hs,Cr,Pn,On,vr,Mr,Dr,Pr,dn,N_,Un,Ge,Fn,we,se,u_,J,b_,x_,Or,w_,L_,R_,Fe,Ur,Re,C_,T_,Bs,Rt,Gr,I_,Xs,vt,Br,A_,$s,M_,Tr,y_,Xr,Wr,zs,Ys,$r,Vr,jr,zr,on,Rn,P_,Zn,Ks,qs,Js,Yr,eo,no,to,Dt,qr=Rs(()=>{hr={},Fs=(function(t,e,n,_,i){var r=new Worker(hr[e]||(hr[e]=URL.createObjectURL(new Blob([t+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(s){var o=s.data,a=o.$e$;if(a){var d=new Error(a[0]);d.code=a[1],d.stack=a[2],i(d,null)}else i(null,o)},r.postMessage(n,_),r}),H=Uint8Array,Le=Uint16Array,Qn=Int32Array,Cn=new H([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vn=new H([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),qn=new H([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),gr=function(t,e){for(var n=new Le(31),_=0;_<31;++_)n[_]=e+=1<<t[_-1];for(var i=new Qn(n[30]),_=1;_<30;++_)for(var r=n[_];r<n[_+1];++r)i[r]=r-n[_]<<5|_;return{b:n,r:i}},Ir=gr(Cn,2),E_=Ir.b,wt=Ir.r;E_[28]=258,wt[258]=28;Sr=gr(vn,0),Ar=Sr.b,p_=Sr.r,Jn=new Le(32768);for(Z=0;Z<32768;++Z)Qe=(Z&43690)>>1|(Z&21845)<<1,Qe=(Qe&52428)>>2|(Qe&13107)<<2,Qe=(Qe&61680)>>4|(Qe&3855)<<4,Jn[Z]=((Qe&65280)>>8|(Qe&255)<<8)>>1;Oe=(function(t,e,n){for(var _=t.length,i=0,r=new Le(e);i<_;++i)t[i]&&++r[t[i]-1];var s=new Le(e);for(i=1;i<e;++i)s[i]=s[i-1]+r[i-1]<<1;var o;if(n){o=new Le(1<<e);var a=15-e;for(i=0;i<_;++i)if(t[i])for(var d=i<<4|t[i],l=e-t[i],c=s[t[i]-1]++<<l,p=c|(1<<l)-1;c<=p;++c)o[Jn[c]>>a]=d}else for(o=new Le(_),i=0;i<_;++i)t[i]&&(o[i]=Jn[s[t[i]-1]++]>>15-t[i]);return o}),en=new H(288);for(Z=0;Z<144;++Z)en[Z]=8;for(Z=144;Z<256;++Z)en[Z]=9;for(Z=256;Z<280;++Z)en[Z]=7;for(Z=280;Z<288;++Z)en[Z]=8;Ln=new H(32);for(Z=0;Z<32;++Z)Ln[Z]=5;yr=Oe(en,9,0),Er=Oe(en,9,1),Nr=Oe(Ln,5,0),br=Oe(Ln,5,1),Nt=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Pe=function(t,e,n){var _=e/8|0;return(t[_]|t[_+1]<<8)>>(e&7)&n},bt=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Mn=function(t){return(t+7)/8|0},Ue=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new H(t.subarray(e,n))},Gs={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},xr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],R=function(t,e,n){var _=new Error(e||xr[t]);if(_.code=t,Error.captureStackTrace&&Error.captureStackTrace(_,R),!n)throw _;return _},et=function(t,e,n,_){var i=t.length,r=_?_.length:0;if(!i||e.f&&!e.l)return n||new H(0);var s=!n,o=s||e.i!=2,a=e.i;s&&(n=new H(i*3));var d=function(O){var V=n.length;if(O>V){var re=new H(Math.max(V*2,O));re.set(n),n=re}},l=e.f||0,c=e.p||0,p=e.b||0,f=e.l,T=e.d,I=e.m,m=e.n,A=i*8;do{if(!f){l=Pe(t,c,1);var b=Pe(t,c+1,3);if(c+=3,b)if(b==1)f=Er,T=br,I=9,m=5;else if(b==2){var h=Pe(t,c,31)+257,y=Pe(t,c+10,15)+4,S=h+Pe(t,c+5,31)+1;c+=14;for(var N=new H(S),x=new H(19),M=0;M<y;++M)x[qn[M]]=Pe(t,c+M*3,7);c+=y*3;for(var W=Nt(x),Y=(1<<W)-1,k=Oe(x,W,1),M=0;M<S;){var L=k[Pe(t,c,Y)];c+=L&15;var E=L>>4;if(E<16)N[M++]=E;else{var B=0,D=0;for(E==16?(D=3+Pe(t,c,3),c+=2,B=N[M-1]):E==17?(D=3+Pe(t,c,7),c+=3):E==18&&(D=11+Pe(t,c,127),c+=7);D--;)N[M++]=B}}var $=N.subarray(0,h),P=N.subarray(h);I=Nt($),m=Nt(P),f=Oe($,I,1),T=Oe(P,m,1)}else R(1);else{var E=Mn(c)+4,u=t[E-4]|t[E-3]<<8,g=E+u;if(g>i){a&&R(0);break}o&&d(p+u),n.set(t.subarray(E,g),p),e.b=p+=u,e.p=c=g*8,e.f=l;continue}if(c>A){a&&R(0);break}}o&&d(p+131072);for(var G=(1<<I)-1,K=(1<<m)-1,me=c;;me=c){var B=f[bt(t,c)&G],ae=B>>4;if(c+=B&15,c>A){a&&R(0);break}if(B||R(2),ae<256)n[p++]=ae;else if(ae==256){me=c,f=null;break}else{var de=ae-254;if(ae>264){var M=ae-257,ne=Cn[M];de=Pe(t,c,(1<<ne)-1)+E_[M],c+=ne}var ge=T[bt(t,c)&K],he=ge>>4;ge||R(3),c+=ge&15;var P=Ar[he];if(he>3){var ne=vn[he];P+=bt(t,c)&(1<<ne)-1,c+=ne}if(c>A){a&&R(0);break}o&&d(p+131072);var ke=p+de;if(p<P){var _e=r-P,C=Math.min(P,ke);for(_e+p<0&&R(3);p<C;++p)n[p]=_[_e+p]}for(;p<ke;++p)n[p]=n[p-P]}}e.l=f,e.p=me,e.b=p,e.f=l,f&&(l=1,e.m=I,e.d=T,e.n=m)}while(!l);return p!=n.length&&s?Ue(n,0,p):n.subarray(0,p)},je=function(t,e,n){n<<=e&7;var _=e/8|0;t[_]|=n,t[_+1]|=n>>8},xn=function(t,e,n){n<<=e&7;var _=e/8|0;t[_]|=n,t[_+1]|=n>>8,t[_+2]|=n>>16},xt=function(t,e){for(var n=[],_=0;_<t.length;++_)t[_]&&n.push({s:_,f:t[_]});var i=n.length,r=n.slice();if(!i)return{t:ze,l:0};if(i==1){var s=new H(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(g,h){return g.f-h.f}),n.push({s:-1,f:25001});var o=n[0],a=n[1],d=0,l=1,c=2;for(n[0]={s:-1,f:o.f+a.f,l:o,r:a};l!=i-1;)o=n[n[d].f<n[c].f?d++:c++],a=n[d!=l&&n[d].f<n[c].f?d++:c++],n[l++]={s:-1,f:o.f+a.f,l:o,r:a};for(var p=r[0].s,_=1;_<i;++_)r[_].s>p&&(p=r[_].s);var f=new Le(p+1),T=Lt(n[l-1],f,0);if(T>e){var _=0,I=0,m=T-e,A=1<<m;for(r.sort(function(h,y){return f[y.s]-f[h.s]||h.f-y.f});_<i;++_){var b=r[_].s;if(f[b]>e)I+=A-(1<<T-f[b]),f[b]=e;else break}for(I>>=m;I>0;){var E=r[_].s;f[E]<e?I-=1<<e-f[E]++-1:++_}for(;_>=0&&I;--_){var u=r[_].s;f[u]==e&&(--f[u],++I)}T=e}return{t:new H(f),l:T}},Lt=function(t,e,n){return t.s==-1?Math.max(Lt(t.l,e,n+1),Lt(t.r,e,n+1)):e[t.s]=n},h_=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new Le(++e),_=0,i=t[0],r=1,s=function(a){n[_++]=a},o=1;o<=e;++o)if(t[o]==i&&o!=e)++r;else{if(!i&&r>2){for(;r>138;r-=138)s(32754);r>2&&(s(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(s(i),--r;r>6;r-=6)s(8304);r>2&&(s(r-3<<5|8208),r=0)}for(;r--;)s(i);r=1,i=t[o]}return{c:n.subarray(0,_),n:e}},wn=function(t,e){for(var n=0,_=0;_<e.length;++_)n+=t[_]*e[_];return n},Pt=function(t,e,n){var _=n.length,i=Mn(e+2);t[i]=_&255,t[i+1]=_>>8,t[i+2]=t[i]^255,t[i+3]=t[i+1]^255;for(var r=0;r<_;++r)t[i+r+4]=n[r];return(i+4+_)*8},m_=function(t,e,n,_,i,r,s,o,a,d,l){je(e,l++,n),++i[256];for(var c=xt(i,15),p=c.t,f=c.l,T=xt(r,15),I=T.t,m=T.l,A=h_(p),b=A.c,E=A.n,u=h_(I),g=u.c,h=u.n,y=new Le(19),S=0;S<b.length;++S)++y[b[S]&31];for(var S=0;S<g.length;++S)++y[g[S]&31];for(var N=xt(y,7),x=N.t,M=N.l,W=19;W>4&&!x[qn[W-1]];--W);var Y=d+5<<3,k=wn(i,en)+wn(r,Ln)+s,L=wn(i,p)+wn(r,I)+s+14+3*W+wn(y,x)+2*y[16]+3*y[17]+7*y[18];if(a>=0&&Y<=k&&Y<=L)return Pt(e,l,t.subarray(a,a+d));var B,D,$,P;if(je(e,l,1+(L<k)),l+=2,L<k){B=Oe(p,f,0),D=p,$=Oe(I,m,0),P=I;var G=Oe(x,M,0);je(e,l,E-257),je(e,l+5,h-1),je(e,l+10,W-4),l+=14;for(var S=0;S<W;++S)je(e,l+3*S,x[qn[S]]);l+=3*W;for(var K=[b,g],me=0;me<2;++me)for(var ae=K[me],S=0;S<ae.length;++S){var de=ae[S]&31;je(e,l,G[de]),l+=x[de],de>15&&(je(e,l,ae[S]>>5&127),l+=ae[S]>>12)}}else B=yr,D=en,$=Nr,P=Ln;for(var S=0;S<o;++S){var ne=_[S];if(ne>255){var de=ne>>18&31;xn(e,l,B[de+257]),l+=D[de+257],de>7&&(je(e,l,ne>>23&31),l+=Cn[de]);var ge=ne&31;xn(e,l,$[ge]),l+=P[ge],ge>3&&(xn(e,l,ne>>5&8191),l+=vn[ge])}else xn(e,l,B[ne]),l+=D[ne]}return xn(e,l,B[256]),l+D[256]},wr=new Qn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ze=new H(0),Lr=function(t,e,n,_,i,r){var s=r.z||t.length,o=new H(_+s+5*(1+Math.ceil(s/7e3))+i),a=o.subarray(_,o.length-i),d=r.l,l=(r.r||0)&7;if(e){l&&(a[0]=r.r>>3);for(var c=wr[e-1],p=c>>13,f=c&8191,T=(1<<n)-1,I=r.p||new Le(32768),m=r.h||new Le(T+1),A=Math.ceil(n/3),b=2*A,E=function(ve){return(t[ve]^t[ve+1]<<A^t[ve+2]<<b)&T},u=new Qn(25e3),g=new Le(288),h=new Le(32),y=0,S=0,N=r.i||0,x=0,M=r.w||0,W=0;N+2<s;++N){var Y=E(N),k=N&32767,L=m[Y];if(I[k]=L,m[Y]=k,M<=N){var B=s-N;if((y>7e3||x>24576)&&(B>423||!d)){l=m_(t,a,0,u,g,h,S,x,W,N-W,l),x=y=S=0,W=N;for(var D=0;D<286;++D)g[D]=0;for(var D=0;D<30;++D)h[D]=0}var $=2,P=0,G=f,K=k-L&32767;if(B>2&&Y==E(N-K))for(var me=Math.min(p,B)-1,ae=Math.min(32767,N),de=Math.min(258,B);K<=ae&&--G&&k!=L;){if(t[N+$]==t[N+$-K]){for(var ne=0;ne<de&&t[N+ne]==t[N+ne-K];++ne);if(ne>$){if($=ne,P=K,ne>me)break;for(var ge=Math.min(K,ne-2),he=0,D=0;D<ge;++D){var ke=N-K+D&32767,_e=I[ke],C=ke-_e&32767;C>he&&(he=C,L=ke)}}}k=L,L=I[k],K+=k-L&32767}if(P){u[x++]=268435456|wt[$]<<18|p_[P];var O=wt[$]&31,V=p_[P]&31;S+=Cn[O]+vn[V],++g[257+O],++h[V],M=N+$,++y}else u[x++]=t[N],++g[t[N]]}}for(N=Math.max(N,M);N<s;++N)u[x++]=t[N],++g[t[N]];l=m_(t,a,d,u,g,h,S,x,W,N-W,l),d||(r.r=l&7|a[l/8|0]<<3,l-=7,r.h=m,r.p=I,r.i=N,r.w=M)}else{for(var N=r.w||0;N<s+d;N+=65535){var re=N+65535;re>=s&&(a[l/8|0]=d,re=s),l=Pt(a,l+1,t.subarray(N,re))}r.i=s}return Ue(o,0,_+Mn(l)+i)},Rr=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,_=9;--_;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),Dn=function(){var t=-1;return{p:function(e){for(var n=t,_=0;_<e.length;++_)n=Rr[n&255^e[_]]^n>>>8;t=n},d:function(){return~t}}},Ot=function(){var t=1,e=0;return{p:function(n){for(var _=t,i=e,r=n.length|0,s=0;s!=r;){for(var o=Math.min(s+2655,r);s<o;++s)i+=_+=n[s];_=(_&65535)+15*(_>>16),i=(i&65535)+15*(i>>16)}t=_,e=i},d:function(){return t%=65521,e%=65521,(t&255)<<24|(t&65280)<<8|(e&255)<<8|e>>8}}},fn=function(t,e,n,_,i){if(!i&&(i={l:1},e.dictionary)){var r=e.dictionary.subarray(-32768),s=new H(r.length+t.length);s.set(r),s.set(t,r.length),t=s,i.w=r.length}return Lr(t,e.level==null?6:e.level,e.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,_,i)},nt=function(t,e){var n={};for(var _ in t)n[_]=t[_];for(var _ in e)n[_]=e[_];return n},mr=function(t,e,n){for(var _=t(),i=t.toString(),r=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),s=0;s<_.length;++s){var o=_[s],a=r[s];if(typeof o=="function"){e+=";"+a+"=";var d=o.toString();if(o.prototype)if(d.indexOf("[native code]")!=-1){var l=d.indexOf(" ",8)+1;e+=d.slice(l,d.indexOf("(",l))}else{e+=d;for(var c in o.prototype)e+=";"+a+".prototype."+c+"="+o.prototype[c].toString()}else e+=d}else n[a]=o}return e},Et=[],Hs=function(t){var e=[];for(var n in t)t[n].buffer&&e.push((t[n]=new t[n].constructor(t[n])).buffer);return e},Cr=function(t,e,n,_){if(!Et[n]){for(var i="",r={},s=t.length-1,o=0;o<s;++o)i=mr(t[o],i,r);Et[n]={c:mr(t[s],i,r),e:r}}var a=nt({},Et[n].e);return Fs(Et[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",n,a,Hs(a),_)},Pn=function(){return[H,Le,Qn,Cn,vn,qn,E_,Ar,Er,br,Jn,xr,Oe,Nt,Pe,bt,Mn,Ue,R,et,Gn,dn,N_]},On=function(){return[H,Le,Qn,Cn,vn,qn,wt,p_,yr,en,Nr,Ln,Jn,wr,ze,Oe,je,xn,xt,Lt,h_,wn,Pt,m_,Mn,Ue,Lr,fn,tt,dn]},vr=function(){return[b_,w_,J,Dn,Rr]},Mr=function(){return[x_,Or]},Dr=function(){return[L_,J,Ot]},Pr=function(){return[R_]},dn=function(t){return postMessage(t,[t.buffer])},N_=function(t){return t&&{out:t.size&&new H(t.size),dictionary:t.dictionary}},Un=function(t,e,n,_,i,r){var s=Cr(n,_,i,function(o,a){s.terminate(),r(o,a)});return s.postMessage([t,e],e.consume?[t.buffer]:[]),function(){s.terminate()}},Ge=function(t){return t.ondata=function(e,n){return postMessage([e,n],[e.buffer])},function(e){e.data[0]?(t.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):t.flush(e.data[1])}},Fn=function(t,e,n,_,i,r,s){var o,a=Cr(t,_,i,function(d,l){d?(a.terminate(),e.ondata.call(e,d)):Array.isArray(l)?l.length==1?(e.queuedSize-=l[0],e.ondrain&&e.ondrain(l[0])):(l[1]&&a.terminate(),e.ondata.call(e,d,l[0],l[1])):s(l)});a.postMessage(n),e.queuedSize=0,e.push=function(d,l){e.ondata||R(5),o&&e.ondata(R(4,0,1),null,!!l),e.queuedSize+=d.length,a.postMessage([d,o=l],d.buffer instanceof ArrayBuffer?[d.buffer]:[])},e.terminate=function(){a.terminate()},r&&(e.flush=function(d){a.postMessage([0,d])})},we=function(t,e){return t[e]|t[e+1]<<8},se=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},u_=function(t,e){return se(t,e)+se(t,e+4)*4294967296},J=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},b_=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&J(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var _=0;_<=n.length;++_)t[_+10]=n.charCodeAt(_)}},x_=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&R(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var _=(e>>3&1)+(e>>4&1);_>0;_-=!t[n++]);return n+(e&2)},Or=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},w_=function(t){return 10+(t.filename?t.filename.length+1:0)},L_=function(t,e){var n=e.level,_=n==0?0:n<6?1:n==9?3:2;if(t[0]=120,t[1]=_<<6|(e.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,e.dictionary){var i=Ot();i.p(e.dictionary),J(t,2,i.d())}},R_=function(t,e){return((t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31)&&R(6,"invalid zlib data"),(t[1]>>5&1)==+!e&&R(6,"invalid zlib data: "+(t[1]&32?"need":"unexpected")+" dictionary"),(t[1]>>3&4)+2};Fe=(function(){function t(e,n){if(typeof e=="function"&&(n=e,e={}),this.ondata=n,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new H(98304),this.o.dictionary){var _=this.o.dictionary.subarray(-32768);this.b.set(_,32768-_.length),this.s.i=32768-_.length}}return t.prototype.p=function(e,n){this.ondata(fn(e,this.o,0,0,this.s),n)},t.prototype.push=function(e,n){this.ondata||R(5),this.s.l&&R(4);var _=e.length+this.s.z;if(_>this.b.length){if(_>2*this.b.length-32768){var i=new H(_&-32768);i.set(this.b.subarray(0,this.s.z)),this.b=i}var r=this.b.length-this.s.z;this.b.set(e.subarray(0,r),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(r),32768),this.s.z=e.length-r+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2),n&&(this.s=this.o={},this.b=ze)},t.prototype.flush=function(e){if(this.ondata||R(5),this.s.l&&R(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var n=new H(6);n[0]=this.s.r>>3;var _=Pt(n,this.s.r,ze);this.s.r=0,this.ondata(n.subarray(0,_>>3),!1)}},t})(),Ur=(function(){function t(e,n){Fn([On,function(){return[Ge,Fe]}],this,un.call(this,e,n),function(_){var i=new Fe(_.data);onmessage=Ge(i)},6,1)}return t})();Re=(function(){function t(e,n){typeof e=="function"&&(n=e,e={}),this.ondata=n;var _=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:_?_.length:0},this.o=new H(32768),this.p=new H(0),_&&this.o.set(_)}return t.prototype.e=function(e){if(this.ondata||R(5),this.d&&R(4),!this.p.length)this.p=e;else if(e.length){var n=new H(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length),this.p=n}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var n=this.s.b,_=et(this.p,this.s,this.o);this.ondata(Ue(_,n,this.s.b),this.d),this.o=Ue(_,this.s.b-32768),this.s.b=this.o.length,this.p=Ue(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,n){this.e(e),this.c(n)},t})(),C_=(function(){function t(e,n){Fn([Pn,function(){return[Ge,Re]}],this,un.call(this,e,n),function(_){var i=new Re(_.data);onmessage=Ge(i)},7,0)}return t})();T_=(function(){function t(e,n){this.c=Dn(),this.l=0,this.v=1,Fe.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),this.l+=e.length,Fe.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var _=fn(e,this.o,this.v&&w_(this.o),n&&8,this.s);this.v&&(b_(_,this.o),this.v=0),n&&(J(_,_.length-8,this.c.d()),J(_,_.length-4,this.l)),this.ondata(_,n)},t.prototype.flush=function(e){Fe.prototype.flush.call(this,e)},t})(),Bs=(function(){function t(e,n){Fn([On,vr,function(){return[Ge,Fe,T_]}],this,un.call(this,e,n),function(_){var i=new T_(_.data);onmessage=Ge(i)},8,1)}return t})();Rt=(function(){function t(e,n){this.v=1,this.r=0,Re.call(this,e,n)}return t.prototype.push=function(e,n){if(Re.prototype.e.call(this,e),this.r+=e.length,this.v){var _=this.p.subarray(this.v-1),i=_.length>3?x_(_):4;if(i>_.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-_.length);this.p=_.subarray(i),this.v=0}Re.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=Mn(this.s.p)+9,this.s={i:0},this.o=new H(0),this.push(new H(0),n)):n&&Re.prototype.c.call(this,n)},t})(),Gr=(function(){function t(e,n){var _=this;Fn([Pn,Mr,function(){return[Ge,Re,Rt]}],this,un.call(this,e,n),function(i){var r=new Rt(i.data);r.onmember=function(s){return postMessage(s)},onmessage=Ge(r)},9,0,function(i){return _.onmember&&_.onmember(i)})}return t})();I_=(function(){function t(e,n){this.c=Ot(),this.v=1,Fe.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),Fe.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var _=fn(e,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(L_(_,this.o),this.v=0),n&&J(_,_.length-4,this.c.d()),this.ondata(_,n)},t.prototype.flush=function(e){Fe.prototype.flush.call(this,e)},t})(),Xs=(function(){function t(e,n){Fn([On,Dr,function(){return[Ge,Fe,I_]}],this,un.call(this,e,n),function(_){var i=new I_(_.data);onmessage=Ge(i)},10,1)}return t})();vt=(function(){function t(e,n){Re.call(this,e,n),this.v=e&&e.dictionary?2:1}return t.prototype.push=function(e,n){if(Re.prototype.e.call(this,e),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(R_(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&R(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Re.prototype.c.call(this,n)},t})(),Br=(function(){function t(e,n){Fn([Pn,Pr,function(){return[Ge,Re,vt]}],this,un.call(this,e,n),function(_){var i=new vt(_.data);onmessage=Ge(i)},11,0)}return t})();A_=(function(){function t(e,n){this.o=un.call(this,e,n)||{},this.G=Rt,this.I=Re,this.Z=vt}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,_){e.ondata(n,_)}},t.prototype.push=function(e,n){if(this.ondata||R(5),this.s)this.s.push(e,n);else{if(this.p&&this.p.length){var _=new H(this.p.length+e.length);_.set(this.p),_.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,n),this.p=null)}},t})(),$s=(function(){function t(e,n){A_.call(this,e,n),this.queuedSize=0,this.G=Gr,this.I=C_,this.Z=Br}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,_,i){e.ondata(n,_,i)},this.s.ondrain=function(n){e.queuedSize-=n,e.ondrain&&e.ondrain(n)}},t.prototype.push=function(e,n){this.queuedSize+=e.length,A_.prototype.push.call(this,e,n)},t})();M_=function(t,e,n,_){for(var i in t){var r=t[i],s=e+i,o=_;Array.isArray(r)&&(o=nt(_,r[1]),r=r[0]),ArrayBuffer.isView(r)?n[s]=[r,o]:(n[s+="/"]=[new H(0),o],M_(r,s,n,_))}},Tr=typeof TextEncoder<"u"&&new TextEncoder,y_=typeof TextDecoder<"u"&&new TextDecoder,Xr=0;try{y_.decode(ze,{stream:!0}),Xr=1}catch{}Wr=function(t){for(var e="",n=0;;){var _=t[n++],i=(_>127)+(_>223)+(_>239);if(n+i>t.length)return{s:e,r:Ue(t,n-1)};i?i==3?(_=((_&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|_>>10,56320|_&1023)):i&1?e+=String.fromCharCode((_&31)<<6|t[n++]&63):e+=String.fromCharCode((_&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(_)}},zs=(function(){function t(e){this.ondata=e,Xr?this.t=new TextDecoder:this.p=ze}return t.prototype.push=function(e,n){if(this.ondata||R(5),n=!!n,this.t){this.ondata(this.t.decode(e,{stream:!0}),n),n&&(this.t.decode().length&&R(8),this.t=null);return}this.p||R(4);var _=new H(this.p.length+e.length);_.set(this.p),_.set(e,this.p.length);var i=Wr(_),r=i.s,s=i.r;n?(s.length&&R(8),this.p=null):this.p=s,this.ondata(r,n)},t})(),Ys=(function(){function t(e){this.ondata=e}return t.prototype.push=function(e,n){this.ondata||R(5),this.d&&R(4),this.ondata(an(e),this.d=n||!1)},t})();$r=function(t){return t==1?3:t<6?2:t==9?1:0},Vr=function(t,e){return e+30+we(t,e+26)+we(t,e+28)},jr=function(t,e,n){var _=we(t,e+28),i=we(t,e+30),r=D_(t.subarray(e+46,e+46+_),!(we(t,e+8)&2048)),s=e+46+_,o=zr(t,s,i,n,se(t,e+20),se(t,e+24),se(t,e+42)),a=o[0],d=o[1],l=o[2];return[we(t,e+10),a,d,r,s+i+we(t,e+32),l]},zr=function(t,e,n,_,i,r,s){var o=i==4294967295,a=r==4294967295,d=s==4294967295,l=e+n,c=o+a+d;if(_&&c){for(;e+4<l;e+=4+we(t,e+2))if(we(t,e)==1)return[o?u_(t,e+4+8*a):i,a?u_(t,e+4):r,d?u_(t,e+4+8*(a+o)):s,1];_<2&&R(13)}return[i,r,s,0]},on=function(t){var e=0;if(t)for(var n in t){var _=t[n].length;_>65535&&R(9),e+=_+4}return e},Rn=function(t,e,n,_,i,r,s,o){var a=_.length,d=n.extra,l=o&&o.length,c=on(d);J(t,e,s!=null?33639248:67324752),e+=4,s!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(r<0&&8),t[e++]=i&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),f=p.getFullYear()-1980;if((f<0||f>119)&&R(10),J(t,e,f<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),e+=4,r!=-1&&(J(t,e,n.crc),J(t,e+4,r<0?-r-2:r),J(t,e+8,n.size)),J(t,e+12,a),J(t,e+14,c),e+=16,s!=null&&(J(t,e,l),J(t,e+6,n.attrs),J(t,e+10,s),e+=14),t.set(_,e),e+=a,c)for(var T in d){var I=d[T],m=I.length;J(t,e,+T),J(t,e+2,m),t.set(I,e+4),e+=4+m}return l&&(t.set(o,e),e+=l),e},P_=function(t,e,n,_,i){J(t,e,101010256),J(t,e+8,n),J(t,e+10,n),J(t,e+12,_),J(t,e+16,i)},Zn=(function(){function t(e){this.filename=e,this.c=Dn(),this.size=0,this.compression=0}return t.prototype.process=function(e,n){this.ondata(null,e,n)},t.prototype.push=function(e,n){this.ondata||R(5),this.c.p(e),this.size+=e.length,n&&(this.crc=this.c.d()),this.process(e,n||!1)},t})(),Ks=(function(){function t(e,n){var _=this;n||(n={}),Zn.call(this,e),this.d=new Fe(n,function(i,r){_.ondata(null,i,r)}),this.compression=8,this.flag=$r(n.level)}return t.prototype.process=function(e,n){try{this.d.push(e,n)}catch(_){this.ondata(_,null,n)}},t.prototype.push=function(e,n){Zn.prototype.push.call(this,e,n)},t})(),qs=(function(){function t(e,n){var _=this;n||(n={}),Zn.call(this,e),this.d=new Ur(n,function(i,r,s){_.ondata(i,r,s)}),this.compression=8,this.flag=$r(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(e,n){this.d.push(e,n)},t.prototype.push=function(e,n){Zn.prototype.push.call(this,e,n)},t})(),Js=(function(){function t(e){this.ondata=e,this.u=[],this.d=1}return t.prototype.add=function(e){var n=this;if(this.ondata||R(5),this.d&2)this.ondata(R(4+(this.d&1)*8,0,1),null,!1);else{var _=an(e.filename),i=_.length,r=e.comment,s=r&&an(r),o=i!=e.filename.length||s&&r.length!=s.length,a=i+on(e.extra)+30;i>65535&&this.ondata(R(11,0,1),null,!1);var d=new H(a);Rn(d,0,e,_,o,-1);var l=[d],c=function(){for(var m=0,A=l;m<A.length;m++){var b=A[m];n.ondata(null,b,!1)}l=[]},p=this.d;this.d=0;var f=this.u.length,T=nt(e,{f:_,u:o,o:s,t:function(){e.terminate&&e.terminate()},r:function(){if(c(),p){var m=n.u[f+1];m?m.r():n.d=1}p=1}}),I=0;e.ondata=function(m,A,b){if(m)n.ondata(m,A,b),n.terminate();else if(I+=A.length,l.push(A),b){var E=new H(16);J(E,0,134695760),J(E,4,e.crc),J(E,8,I),J(E,12,e.size),l.push(E),T.c=I,T.b=a+I+16,T.crc=e.crc,T.size=e.size,p&&T.r(),p=1}else p&&c()},this.u.push(T)}},t.prototype.end=function(){var e=this;if(this.d&2){this.ondata(R(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var e=0,n=0,_=0,i=0,r=this.u;i<r.length;i++){var s=r[i];_+=46+s.f.length+on(s.extra)+(s.o?s.o.length:0)}for(var o=new H(_+22),a=0,d=this.u;a<d.length;a++){var s=d[a];Rn(o,e,s,s.f,s.u,-s.c-2,n,s.o),e+=46+s.f.length+on(s.extra)+(s.o?s.o.length:0),n+=s.b}P_(o,e,this.u.length,_,n),this.ondata(null,o,!0),this.d=2},t.prototype.terminate=function(){for(var e=0,n=this.u;e<n.length;e++){var _=n[e];_.t()}this.d=2},t})();Yr=(function(){function t(){}return t.prototype.push=function(e,n){this.ondata(null,e,n)},t.compression=0,t})(),eo=(function(){function t(){var e=this;this.i=new Re(function(n,_){e.ondata(null,n,_)})}return t.prototype.push=function(e,n){try{this.i.push(e,n)}catch(_){this.ondata(_,null,n)}},t.compression=8,t})(),no=(function(){function t(e,n){var _=this;n<32e4?this.i=new Re(function(i,r){_.ondata(null,i,r)}):(this.i=new C_(function(i,r,s){_.ondata(i,r,s)}),this.terminate=this.i.terminate)}return t.prototype.push=function(e,n){this.i.terminate&&(e=Ue(e,0)),this.i.push(e,n)},t.compression=8,t})(),to=(function(){function t(e){this.onfile=e,this.k=[],this.o={0:Yr},this.p=ze}return t.prototype.push=function(e,n){var _=this;if(this.onfile||R(5),this.p||R(4),this.c>0){var i=Math.min(this.c,e.length),r=e.subarray(0,i);if(this.c-=i,this.d?this.d.push(r,!this.c):this.k[0].push(r),e=e.subarray(i),e.length)return this.push(e,n)}else{var s=0,o=0,a=void 0,d=void 0;this.p.length?e.length?(d=new H(this.p.length+e.length),d.set(this.p),d.set(e,this.p.length)):d=this.p:d=e;for(var l=d.length,c=this.c,p=c&&this.d,f=function(){var A=se(d,o);if(A==67324752){s=1,a=o,T.d=null,T.c=0;var b=we(d,o+6),E=we(d,o+8),u=b&2048,g=b&8,h=we(d,o+26),y=we(d,o+28);if(l>o+30+h+y){var S=[];T.k.unshift(S),s=2;var N=se(d,o+18),x=se(d,o+22),M=D_(d.subarray(o+30,o+=30+h),!u),W=zr(d,o,y,2,N,x,0),Y=W[0],k=W[1],L=W[3];g&&(Y=-1-L),o+=y,T.c=Y;var B,D={name:M,compression:E,start:function(){if(D.ondata||R(5),!Y)D.ondata(null,ze,!0);else{var $=_.o[E];$||D.ondata(R(14,"unknown compression type "+E,1),null,!1),B=Y<0?new $(M):new $(M,Y,k),B.ondata=function(me,ae,de){D.ondata(me,ae,de)};for(var P=0,G=S;P<G.length;P++){var K=G[P];B.push(K,!1)}_.k[0]==S&&_.c?_.d=B:B.push(ze,!0)}},terminate:function(){B&&B.terminate&&B.terminate()}};Y>=0&&(D.size=Y,D.originalSize=k),T.onfile(D)}return"break"}else if(c){if(A==134695760)return a=o+=12+(c==-2&&8),s=3,T.c=0,"break";if(A==33639248)return a=o-=4,s=3,T.c=0,"break"}},T=this;o<l-4;++o){var I=f();if(I==="break")break}if(this.p=ze,c<0){var m=s?d.subarray(0,a-12-(c==-2&&8)-(se(d,a-16)==134695760&&4)):d.subarray(0,o);p?p.push(m,!!s):this.k[+(s==2)].push(m)}if(s&2)return this.push(d.subarray(o),n);this.p=d.subarray(o)}n&&(this.c&&R(13),this.p=null)},t.prototype.register=function(e){this.o[e.compression]=e},t})(),Dt=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()}});var Pc={};f_(Pc,{TARGETS:()=>Mc,createCompiler:()=>vc,targets:()=>Dc});var Ms=Object.freeze({kind:"third-party prebuilt",project:"Nim-WASM-Compiler",repository:"https://github.com/benagastov/Nim-WASM-Compiler",commit:"ca3471ae124b40b51268da6e202753dfa061731c",committedAt:"2026-06-15T05:32:08Z",url:"https://benagastov.github.io/Nim-WASM-Compiler/static/nim/",license:"MIT, for that project's glue and patches; the compiler it contains is Nim 2.2.4, also MIT",compiler:{name:"nim",version:"2.2.4",host:"Emscripten, wasm32",buildCommand:'nim c --cpu:wasm32 --os:any --define:danger --passC:"-s USE_ZLIB=1"'}}),lr=Object.freeze({"nim-bundle.js":{bytes:6566418,sha256:"170a78937e21ac0ec47e7d3f0eccefc261178f336ba92ab43acdb2f73ffd1301"},"nim.wasm":{bytes:4812366,sha256:"40e8c62fb96ee786fcd91f0ee2306241adeaf38c148bc8ec9788e0cc5cb26567"},"nimbase.h":{bytes:20734,sha256:"28491d05916eab446de054370808030b33b63fd5623dcd454212adec27ee934d"}});async function Ds(t){let e=globalThis.crypto?.subtle;if(!e)throw new Error("Verifying the compiler assets needs crypto.subtle: a secure context in the browser, or Node 20 and later.");let n=await e.digest("SHA-256",t);return[...new Uint8Array(n)].map(_=>_.toString(16).padStart(2,"0")).join("")}async function cr(t,e){let n=lr[t];if(!n)throw new Error(`No pinned receipt for the compiler asset ${t}`);if(e.byteLength!==n.bytes)throw new Error(`The compiler asset ${t} is ${e.byteLength} bytes, expected ${n.bytes}`);let _=await Ds(e);if(_!==n.sha256)throw new Error(`The compiler asset ${t} failed SHA-256 verification: expected ${n.sha256}, got ${_}`);return e}function fr(t,e){if(t.baseUrl!=null&&t.baseUrl!=="")return Os(t);if(!e)throw new Error("baseUrl is required here. The assets that ship in this package can only be read where there is a filesystem, and a browser cannot reach a file inside an npm package - copy them somewhere your page can fetch with `npx --package @live-codes/nim-wasm nim-wasm-copy-assets <dir>` and pass that directory as baseUrl.");return Us(e)}var Ps=t=>{let e;try{e=new URL(String(t),typeof location>"u"?void 0:location.href)}catch(n){throw new Error(`baseUrl must be an absolute http(s) URL, or relative to the page in a browser: ${n.message}`,{cause:n})}if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("baseUrl must use HTTP(S).");return e.pathname.endsWith("/")||(e.pathname+="/"),e};function Os(t){let e=Ps(t.baseUrl);return{kind:"hosted",key:e.href,description:e.href,baseUrl:e.href,bundleUrl:new URL("nim-bundle.js",e).href,locateFile:n=>new URL(n,e).href,async readAsset(n){let _=new URL(n,e),i=await fetch(_);if(!i.ok)throw new Error(`Failed to load the compiler asset ${_}: ${i.status}`);let r=new Uint8Array(await i.arrayBuffer());return cr(n,r)}}}function Us(t){return{kind:"packaged",key:`packaged\0${t.root.href}`,description:`the assets packaged with this library (${t.root.href})`,bundleUrl:null,locateFile:null,readAsset:async e=>cr(e,await t.readFile(e))}}function sn(t){if(t.debugMode!==void 0){if(t.debugMode==="none"||t.debugMode==="trace"||t.debugMode==="lldb")return t.debugMode;throw new Error(`unsupported wasm-clang debug mode: ${String(t.debugMode)}`)}return t.debug?"trace":"none"}function Nn(t,...e){let n={};for(let _ of e)n[_]=(t[_]||(()=>0)).bind(t);return n}function bn(t,e,n=-1){let _=n===-1?t.length:e+n,i="";for(let r=e;r<_&&t[r];++r)i+=String.fromCharCode(t[r]);return i}function ur(t,e,n=-1){let _=n===-1?t.length:e+n,i=[];for(let r=e;r<_&&t[r];++r)i.push(t[r]);return new TextDecoder().decode(Uint8Array.from(i))}function pr(t,e,n){return parseInt(bn(t,e,n),8)}var cn=class{memory;view;buffer;u8;u32;constructor(e){this.memory=e,this.buffer=e.buffer,this.view=new DataView(this.buffer),this.u8=new Uint8Array(this.buffer),this.u32=new Uint32Array(this.buffer)}check(){this.buffer.byteLength===0&&(this.buffer=this.memory.buffer,this.view=new DataView(this.buffer),this.u8=new Uint8Array(this.buffer),this.u32=new Uint32Array(this.buffer))}read8(e){return this.u8[e]}read32(e){return this.u32[e>>2]}readInt32(e){return this.view.getInt32(e,!0)}readFloat32(e){return this.view.getFloat32(e,!0)}readFloat64(e){return this.view.getFloat64(e,!0)}readStr(e,n){return bn(this.u8,e,n)}readStrR(e,n){return ur(this.u8,e,n)}write8(e,n){this.u8[e]=n}write32(e,n){this.u32[e>>2]=n}write64(e,n,_=0){this.write32(e,n),this.write32(e+4,_)}writeStr(e,n){return e+=this.write(e,n),this.write8(e,0),n.length+1}writeUint8(e,n){return new Uint8Array(this.buffer,e,n.length).set(n),n.length}write(e,n){return n instanceof ArrayBuffer?this.writeUint8(e,new Uint8Array(n)):n instanceof SharedArrayBuffer?this.writeUint8(e,new Uint8Array(n)):typeof n=="string"?this.writeUint8(e,n.split("").map(_=>_.charCodeAt(0))):this.writeUint8(e,n)}};var Ut=new Map,Ft=new Map,io=t=>t.byteLength>=2&&t[0]===31&&t[1]===139,Hn=128*1024*1024,Gt=4*1024*1024,Jr=64*1024;async function Zr(t,e,n,_){let i=t.getReader(),r=_,s=!1;if(r?.aborted){s=!0;let T=pe(r);try{Promise.resolve(i.cancel(T)).catch(()=>{})}catch{}try{i.releaseLock()}catch{}throw T}let o,a=r?new Promise((T,I)=>{o=()=>{if(s)return;s=!0;let m=pe(r);try{Promise.resolve(i.cancel(m)).catch(()=>{})}catch{}I(m)},r.addEventListener("abort",o,{once:!0})}):void 0,d=new Uint8Array(Math.min(Jr,n)),l=0,c=!1,p,f;try{for(fe(r);;){let T=i.read(),{done:I,value:m}=a?await Promise.race([T,a]):await T;if(fe(r),I)break;if(!m)continue;let A=l+m.byteLength;if(A>n)throw new Error(`Runtime asset ${e} decompressed size exceeds the ${n} byte limit`);if(A>d.byteLength){let b=Math.min(n,Math.max(A,Math.max(d.byteLength*2,1))),E=new Uint8Array(b);E.set(d.subarray(0,l)),d=E}d.set(m,l),l=A}fe(r),p=d.subarray(0,l),c=!0}catch(T){if(r?.aborted)throw pe(r);if(!s){s=!0;try{Promise.resolve(i.cancel(T)).catch(()=>{})}catch{}}throw T}finally{o&&r?.removeEventListener("abort",o);try{i.releaseLock()}catch(T){c&&(f={error:T})}}if(f)throw f.error;return p}function Qr(t){let e;try{e=new URL(t,typeof location<"u"?location.href:void 0)}catch{throw new Error("Runtime asset URL must be absolute outside a browser document")}if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Runtime assets must use HTTP(S)");if(e.username||e.password)throw new Error("Runtime asset URLs must not include credentials");if(e.hash)throw new Error("Runtime asset URLs must not include fragments");return e}function ei(t){let e=t.headers.get("Content-Length");if(e===null)return 0;let n=Number(e);if(!/^\d+$/u.test(e)||!Number.isSafeInteger(n))throw new Error("Runtime asset has an invalid Content-Length");return n}function pe(t){return t.reason??new DOMException("Runtime asset load aborted","AbortError")}function _t(t,e,n){return e?new Promise((_,i)=>{let r=!1,s=()=>{r||(r=!0,e.removeEventListener("abort",s),i(pe(e)))};e.addEventListener("abort",s,{once:!0}),t.then(o=>{if(r){n&&Promise.resolve().then(()=>n(o,e.reason)).catch(()=>{});return}r=!0,e.removeEventListener("abort",s),_(o)},o=>{r||(r=!0,e.removeEventListener("abort",s),i(o))}),e.aborted&&s()}):t}function fe(t){if(t?.aborted)throw pe(t)}function be(t,e){try{t.body?.cancel(e).catch(()=>{})}catch{}}async function ni(t,e,n,_,i){if(i?.aborted){let m=pe(i);throw be(t,m),m}let r;try{r=ei(t)}catch(m){throw be(t,m),m}if(r>n)throw be(t),new Error(`Runtime asset ${e} size exceeds the ${n} byte limit`);if(!t.body){let m=new Uint8Array(await _t(t.arrayBuffer(),i));if(i?.aborted)throw pe(i);if(m.byteLength>n)throw new Error(`Runtime asset ${e} size exceeds the ${n} byte limit`);return _?.set?.(1),m}let s=i,o=t.body.getReader(),a=!1,d=m=>{if(!a){a=!0;try{Promise.resolve(o.cancel(m)).catch(()=>{})}catch{}}};if(s?.aborted){let m=pe(s);d(m);try{o.releaseLock()}catch{}throw m}let l,c=s?new Promise((m,A)=>{l=()=>{let b=pe(s);d(b),A(b)},s.addEventListener("abort",l,{once:!0})}):void 0,p,f=0,T,I;try{for(p=new Uint8Array(Math.min(n,r||Jr));;){fe(s);let m=o.read(),{done:A,value:b}=c?await Promise.race([m,c]):await m;if(fe(s),A)break;if(!b)continue;let E=f+b.byteLength;if(E>n){let u=new Error(`Runtime asset ${e} size exceeds the ${n} byte limit`);throw d(u),u}if(E>p.byteLength){let u=Math.min(n,Math.max(E,Math.max(p.byteLength*2,1))),g=new Uint8Array(u);g.set(p.subarray(0,f)),p=g}p.set(b,f),f=E,r>0&&_?.set?.(f/r)}fe(s),T=p.subarray(0,f)}catch(m){if(s?.aborted){let A=pe(s);throw d(A),A}throw d(m),m}finally{l&&s?.removeEventListener("abort",l);try{o.releaseLock()}catch(m){s?.aborted||(I={error:m})}}if(s?.aborted){let m=pe(s);throw d(m),m}if(I)throw I.error;return T}async function ti(t,e={}){let n=e.maxBytes??Gt;if(!Number.isSafeInteger(n)||n<=0)throw new Error("Runtime JSON byte limit must be a positive safe integer");let _=Qr(t.toString()),i=e.label?.trim()||"runtime JSON",r=e.fetchImpl??globalThis.fetch?.bind(globalThis);if(!r)throw new Error(`Fetch is unavailable while loading ${i}`);if(e.signal?.aborted)throw pe(e.signal);let s={cache:"no-store",credentials:"omit",redirect:"error",referrerPolicy:"no-referrer"};e.signal&&(s.signal=e.signal);let o=Promise.resolve(r(_.toString(),s)),a=await _t(o,e.signal,(c,p)=>{be(c,p)});if(e.signal?.aborted){let c=pe(e.signal);throw be(a,c),c}if(a.url){let c;try{c=new URL(a.url)}catch{throw be(a),new Error(`${i} returned an invalid final URL`)}if(c.href!==_.href)throw be(a),new Error(`${i} returned an unexpected final URL`)}if(!a.ok)throw be(a),new Error(`Failed to load ${i} from ${_}: ${a.status}`);let d=await ni(a,_,n,void 0,e.signal),l;try{l=new TextDecoder("utf-8",{fatal:!0}).decode(d)}catch(c){throw new Error(`${i} is not valid UTF-8`,{cause:c})}try{return JSON.parse(l)}catch(c){throw new Error(`${i} is not valid JSON`,{cause:c})}}async function so(t,e="runtime asset",n=Hn,_){if(!Number.isSafeInteger(n)||n<0)throw new Error("Runtime asset decompression limit must be a non-negative safe integer");if(fe(_),!io(t)){if(t.byteLength>n)throw new Error(`Runtime asset ${e} decompressed size exceeds the ${n} byte limit`);return t}if(typeof DecompressionStream!="function")throw new Error(`Failed to decompress runtime asset ${e}: DecompressionStream('gzip') is unavailable`);try{let i=Uint8Array.from(t),r=new ReadableStream({start(a){a.enqueue(i),a.close()}}),s=new DecompressionStream("gzip"),o=r.pipeThrough({readable:s.readable,writable:s.writable});return await Zr(o,e,n,_)}catch(i){throw _?.aborted?pe(_):new Error(`Failed to decompress runtime asset ${e}: ${i instanceof Error?i.message:String(i)}`)}}async function oo(t,e,n,_,i){if(i?.aborted){let h=pe(i);throw be(t,h),h}let r;try{r=ei(t)}catch(h){throw be(t,h),h}if(r>n)throw be(t),new Error(`Runtime asset ${e} download size exceeds the ${n} byte limit`);if(!t.body){let h=new Uint8Array(await _t(t.arrayBuffer(),i));if(fe(i),h.byteLength>n)throw new Error(`Runtime asset ${e} download size exceeds the ${n} byte limit`);let y=await so(h,e,n,i);return fe(i),_?.set?.(1),y}let s=t.body.getReader(),o=[],a=0,d=0,l=!1,c=!1,p=!1,f=()=>{c||(c=!0,s.releaseLock())},T=h=>{if(!(c||p)){p=!0;try{Promise.resolve(s.cancel(h)).catch(()=>{})}catch{}try{f()}catch{}}};if(i?.aborted){let h=pe(i);throw T(h),h}let I,m=i?new Promise((h,y)=>{I=()=>{let S=pe(i);T(S),y(S)},i.addEventListener("abort",I,{once:!0})}):void 0;try{for(fe(i);a<2;){let h=s.read(),{done:y,value:S}=m?await Promise.race([h,m]):await h;if(fe(i),y){l=!0,f();break}if(!S)continue;let N=d+S.byteLength;if(N>n){let x=new Error(`Runtime asset ${e} download size exceeds the ${n} byte limit`);throw T(x),x}o.push(S),a+=S.byteLength,d=N,r>0&&_?.set?.(Math.min(d/r,1))}fe(i)}catch(h){throw T(h),i?.aborted?pe(i):h}finally{I&&i?.removeEventListener("abort",I)}let A,b;for(let h of o){for(let y of h)if(A===void 0?A=y:b===void 0&&(b=y),b!==void 0)break;if(b!==void 0)break}let E=0,u=new ReadableStream({async pull(h){if(E<o.length){h.enqueue(o[E++]);return}if(l){h.close();return}try{let{done:y,value:S}=await s.read();if(fe(i),y){l=!0,f(),h.close();return}if(!S)return;let N=d+S.byteLength;if(N>n){let x=new Error(`Runtime asset ${e} download size exceeds the ${n} byte limit`);T(x),h.error(x);return}d=N,r>0&&_?.set?.(Math.min(d/r,1)),h.enqueue(S)}catch(y){T(y),h.error(y)}},cancel(h){T(h)}}),g=u;if(A===31&&b===139){if(typeof DecompressionStream!="function"){let y=new Error(`Failed to decompress runtime asset ${e}: DecompressionStream('gzip') is unavailable`);throw T(y),y}let h=new DecompressionStream("gzip");g=u.pipeThrough({readable:h.readable,writable:h.writable})}try{let h=await Zr(g,e,n,i);return _?.set?.(1),h}catch(h){throw T(h),i?.aborted?pe(i):new Error(`Failed to decompress runtime asset ${e}: ${h instanceof Error?h.message:String(h)}`)}}async function ao(t,e,n,_){fe(_);let{unzipSync:i}=await Promise.resolve().then(()=>(qr(),Kr));fe(_);let r,s=i(t,{filter(o){if(o.name.endsWith("/")||r!==void 0)return!1;if(o.originalSize>n)throw new Error(`Runtime asset ${e} extracted size exceeds the ${n} byte limit`);return r=o.name,!0}});fe(_);for(let[o,a]of Object.entries(s))if(!o.endsWith("/"))return a;throw new Error("No entry found")}var _i=async(t,e,n=Hn,_)=>{if(!Number.isSafeInteger(n)||n<0)throw new Error("Runtime asset byte limit must be a non-negative safe integer");fe(_);let i=`${t}\0${n}`,r=_?void 0:Ft.get(i);r||(r=(async()=>{let o=Qr(t),a={credentials:"omit",redirect:"error",referrerPolicy:"no-referrer"};_&&(a.signal=_);let d;try{let c=Promise.resolve(fetch(o,a));d=await _t(c,_,(p,f)=>{be(p,f)})}catch(c){throw _?.aborted?pe(_):c}if(_?.aborted){let c=pe(_);throw be(d,c),c}if(d.url){let c;try{c=new URL(d.url)}catch{throw be(d),new Error("Runtime asset returned an invalid final URL")}if(c.href!==o.href)throw be(d),new Error("Runtime asset returned an unexpected final URL")}if(!d.ok)throw be(d),new Error(`Failed to load runtime asset ${o}: ${d.status}`);if(o.pathname.endsWith(".gz"))return await oo(d,o,n,e,_);let l=await ni(d,o,n,e,_);return o.pathname.endsWith(".zip")?await ao(l,o,n,_):l})(),_||(r=r.catch(o=>{throw Ft.get(i)===r&&Ft.delete(i),o}),Ft.set(i,r)));let s=await r;return fe(_),e?.set?.(1),s},pn=async(t,e,n=Hn,_)=>{let i=await _i(t,e,n,_);return fe(_),Uint8Array.from(i)};async function Bn(t,e,n,_=Hn){fe(n);let i=`${t}\0${_}`,r=n?void 0:Ut.get(i);if(r)return r;let s=(async()=>{let o=await _i(t,e,_,n);fe(n);let a=o.buffer;if(!(a instanceof ArrayBuffer))throw new TypeError("Runtime asset compilation requires an ArrayBuffer");let d=new Uint8Array(a,o.byteOffset,o.byteLength),l=await _t(WebAssembly.compile(d),n);return fe(n),l})();return n||(s=s.catch(o=>{throw Ut.get(i)===s&&Ut.delete(i),o}),Ut.set(i,s)),s}function ri(t,e){return WebAssembly.instantiate(t,e)}var rt=class extends Error{code;constructor(e){super(`process exited with code ${e}.`),this.code=e}},it=class extends Error{constructor(e,n){super(`${e}.${n} not implemented.`)}},hn=class extends Error{constructor(e="abort"){super(e)}},O_=class extends Error{constructor(e){super(e)}};function U_(t){if(!t)throw new O_("assertion failed.")}var lo=["&&","||","==","!=","<=",">=","+","-","*","/","%","<",">","!"],F_=t=>!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__debugExpressionKind==="array",ii=t=>!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__debugExpressionKind==="object",G_=(t,e)=>{let n=t[e];if(n!=="'"&&n!=='"')throw new Error("expected quoted string");let _=e+1,i="";for(;_<t.length;){let r=t[_];if(!r)break;if(r==="\\"){let s=t[_+1];if(!s)throw new Error("unterminated string literal");s==="n"?i+=`
`:s==="r"?i+="\r":s==="t"?i+="	":i+=s,_+=2;continue}if(r===n)return{value:i,next:_+1};i+=r,_+=1}throw new Error("unterminated string literal")},co=t=>{let e=[];for(let n=0;n<t.length;){let _=t[n];if(!_)break;if(/\s/.test(_)){n+=1;continue}if(_==="("||_===")"){e.push({type:"paren",value:_}),n+=1;continue}if(_==="["||_==="]"){e.push({type:"bracket",value:_}),n+=1;continue}if(_==="."){e.push({type:"dot"}),n+=1;continue}let i=lo.find(o=>t.startsWith(o,n));if(i){e.push({type:"operator",value:i}),n+=i.length;continue}if(_==="'"||_==='"'){let o=G_(t,n);e.push({type:"string",value:o.value}),n=o.next;continue}let r=t.slice(n).match(/^\d+(?:\.\d+)?/);if(r?.[0]){e.push({type:"number",value:r[0]}),n+=r[0].length;continue}let s=t.slice(n).match(/^[A-Za-z_]\w*/);if(s?.[0]){s[0]==="true"||s[0]==="false"||s[0]==="True"||s[0]==="False"?e.push({type:"boolean",value:s[0]==="true"||s[0]==="True"}):s[0]==="null"||s[0]==="None"?e.push({type:"null"}):s[0]==="and"?e.push({type:"operator",value:"&&"}):s[0]==="or"?e.push({type:"operator",value:"||"}):s[0]==="not"?e.push({type:"operator",value:"!"}):e.push({type:"identifier",value:s[0]}),n+=s[0].length;continue}throw new Error(`unsupported token near "${t.slice(n)}"`)}return e},Ht=(t,e=0)=>{let n=e;for(;/\s/.test(t[n]||"");)n+=1;let _=t[n];if(_==="["){n+=1;let r=[];for(;;){for(;/\s/.test(t[n]||"");)n+=1;if(t[n]==="]")return{value:r,next:n+1};if(t.startsWith("...",n)){for(r.truncated=!0,n+=3;/\s/.test(t[n]||"");)n+=1;if(t[n]==="]")return{value:r,next:n+1};throw new Error("unsupported array preview")}let s=Ht(t,n);for(r.push(s.value),n=s.next;/\s/.test(t[n]||"");)n+=1;if(t[n]===","){n+=1;continue}if(t[n]==="]")return{value:r,next:n+1};throw new Error("unsupported array preview")}}if(_==="("){n+=1;let r=[];for(;;){for(;/\s/.test(t[n]||"");)n+=1;if(t[n]===")")return{value:r,next:n+1};if(t.startsWith("...",n)){for(r.truncated=!0,n+=3;/\s/.test(t[n]||"");)n+=1;if(t[n]===")")return{value:r,next:n+1};throw new Error("unsupported tuple preview")}let s=Ht(t,n);for(r.push(s.value),n=s.next;/\s/.test(t[n]||"");)n+=1;if(t[n]===","){n+=1;continue}if(t[n]===")")return{value:r,next:n+1};throw new Error("unsupported tuple preview")}}if(_==="{"){n+=1;let r={};for(;;){for(;/\s/.test(t[n]||"");)n+=1;if(t[n]==="}")return{value:r,next:n+1};if(t.startsWith("...",n))throw new Error("unavailable");let s="";if(t[n]==="'"||t[n]==='"'){let a=G_(t,n);s=a.value,n=a.next}else{let a=t.slice(n).match(/^[A-Za-z_]\w*/)?.[0];if(!a)throw new Error("unsupported object preview");s=a,n+=a.length}for(;/\s/.test(t[n]||"");)n+=1;if(t[n]!==":")throw new Error("unsupported object preview");n+=1;let o=Ht(t,n);for(r[s]=o.value,n=o.next;/\s/.test(t[n]||"");)n+=1;if(t[n]===","){n+=1;continue}if(t[n]==="}")return{value:r,next:n+1};throw new Error("unsupported object preview")}}if(_==="'"||_==='"')return G_(t,n);if(t.startsWith("true",n))return{value:!0,next:n+4};if(t.startsWith("false",n))return{value:!1,next:n+5};if(t.startsWith("True",n))return{value:!0,next:n+4};if(t.startsWith("False",n))return{value:!1,next:n+5};if(t.startsWith("null",n))return{value:null,next:n+4};if(t.startsWith("None",n))return{value:null,next:n+4};let i=t.slice(n).match(/^-?\d+(?:\.\d+)?/);if(i?.[0])return{value:Number(i[0]),next:n+i[0].length};throw new Error("unsupported preview")},si=t=>{let e=t.trim();if(!e||e==="?")throw new Error("unavailable");if(e==="true"||e==="false"||e==="True"||e==="False")return e==="true"||e==="True";if(e==="null"||e==="None")return null;let n=Number(e);if(!Number.isNaN(n))return n;if(e.startsWith("[")||e.startsWith("(")||e.startsWith("{")||e.startsWith("'")||e.startsWith('"')){let _=Ht(e);if(e.slice(_.next).trim())throw new Error("unsupported preview");return _.value}throw new Error("unsupported preview")},fo=t=>`'${t.replaceAll("\\","\\\\").replaceAll("'","\\'").replaceAll(`
`,"\\n").replaceAll("\r","\\r").replaceAll("	","\\t")}'`,st=(t,e,n)=>{if(t===null)return"null";if(typeof t=="number"||typeof t=="boolean")return`${t}`;if(typeof t=="string")return e?fo(t):t;if(n>=4)return"...";if(Array.isArray(t)){let s=Math.min(t.length,8);return`[${t.slice(0,s).map(a=>st(a,!0,n+1)).join(", ")}${t.truncated||t.length>s?", ...":""}]`}if(F_(t)){let s=t.keys?.()||[],o=Math.min(s.length||t.length||0,8),a=[];for(let l=0;l<o;l+=1){let c=s[l]??l;a.push(st(t.get(c),!0,n+1))}let d=t.truncated||t.length!=null&&t.length>o;return`[${a.join(", ")}${d?", ...":""}]`}if(ii(t)){let s=t.keys?.()||[],o=Math.min(s.length,8);return`{${s.slice(0,o).map(d=>`${d}: ${st(t.get(d),!0,n+1)}`).join(", ")}${s.length>o?", ...":""}}`}let _=Object.keys(t),i=Math.min(_.length,8);return`{${_.slice(0,i).map(s=>`${s}: ${st(t[s],!0,n+1)}`).join(", ")}${_.length>i?", ...":""}}`},uo=t=>st(t,!1,0),oi=(t,e)=>{let n=t.trim();if(!n)throw new Error("empty expression");let _=co(n),i=new Map,r=u=>{if(i.has(u))return i.get(u);let g=e(u);return i.set(u,g),g},s=(u,g)=>{if(!Number.isInteger(g))throw new Error("unsupported index access");if(Array.isArray(u)){if(g<0||g>=u.length)throw new Error("unavailable");return u[g]}if(F_(u)){if(u.length!=null&&(g<0||g>=u.length))throw new Error("unavailable");return u.get(g)}throw new Error("unsupported index access")},o=(u,g)=>{if(Array.isArray(u)||F_(u)||!u)throw new Error("unsupported member access");if(ii(u)){if(!u.has(g))throw new Error("unavailable");return u.get(g)}if(typeof u!="object"||!Object.hasOwn(u,g))throw new Error("unavailable");return u[g]},a=0,d=!0,l=u=>{let g=d;d=!1;try{return u()}finally{d=g}},c=()=>{let u=_[a];if(!u)throw new Error("unexpected end of expression");if(u.type==="number")return a+=1,Number(u.value);if(u.type==="boolean")return a+=1,u.value;if(u.type==="null")return a+=1,null;if(u.type==="string")return a+=1,u.value;if(u.type==="identifier"){a+=1;let g=d?r(u.value):null;for(;;){let h=_[a];if(h?.type==="bracket"&&h.value==="["){a+=1;let y=Number(b()),S=_[a];if(!S||S.type!=="bracket"||S.value!=="]")throw new Error("missing closing bracket");a+=1,g=d?s(g,y):null;continue}if(h?.type==="dot"){a+=1;let y=_[a];if(!y||y.type!=="identifier")throw new Error("missing property name");a+=1,g=d?o(g,y.value):null;continue}break}return g}if(u.type==="paren"&&u.value==="("){a+=1;let g=b(),h=_[a];if(!h||h.type!=="paren"||h.value!==")")throw new Error("missing closing parenthesis");return a+=1,g}throw new Error("expected value")},p=()=>{let u=_[a];return u?.type==="operator"&&u.value==="!"?(a+=1,!p()):u?.type==="operator"&&u.value==="-"?(a+=1,-Number(p())):u?.type==="operator"&&u.value==="+"?(a+=1,Number(p())):c()},f=()=>{let u=p();for(;;){let g=_[a];if(g?.type!=="operator"||!["*","/","%"].includes(g.value))return u;a+=1;let h=p();g.value==="*"&&(u=Number(u)*Number(h)),g.value==="/"&&(u=Number(u)/Number(h)),g.value==="%"&&(u=Number(u)%Number(h))}},T=()=>{let u=f();for(;;){let g=_[a];if(g?.type!=="operator"||!["+","-"].includes(g.value))return u;a+=1;let h=f();g.value==="+"&&(typeof u=="string"||typeof h=="string"?u=`${u??"null"}${h??"null"}`:u=Number(u)+Number(h)),g.value==="-"&&(u=Number(u)-Number(h))}},I=()=>{let u=T();for(;;){let g=_[a];if(g?.type!=="operator"||!["<","<=",">",">="].includes(g.value))return u;a+=1;let h=T(),y=typeof u=="string"&&typeof h=="string"?u:Number(u),S=typeof u=="string"&&typeof h=="string"?h:Number(h);g.value==="<"&&(u=y<S),g.value==="<="&&(u=y<=S),g.value===">"&&(u=y>S),g.value===">="&&(u=y>=S)}},m=()=>{let u=I();for(;;){let g=_[a];if(g?.type!=="operator"||!["==","!="].includes(g.value))return u;a+=1;let h=I();g.value==="=="&&(u=u===h),g.value==="!="&&(u=u!==h)}},A=()=>{let u=m();for(;;){let g=_[a];if(!g||g.type!=="operator"||g.value!=="&&")break;a+=1;let h=d&&u?m():l(m);d&&(u=!!u&&!!h)}return u},b=()=>{let u=A();for(;;){let g=_[a];if(!g||g.type!=="operator"||g.value!=="||")break;a+=1;let h=d&&!u?A():l(A);d&&(u=!!u||!!h)}return u},E=b();if(a!==_.length)throw new Error("unexpected trailing tokens");return uo(E)};var ai=Int32Array.BYTES_PER_ELEMENT*2,po=-1,H_=new TextEncoder,ho=new TextDecoder,di=t=>t instanceof Int32Array?t:new Int32Array(t),li=t=>new Uint8Array(t.buffer,t.byteOffset+ai,t.byteLength-ai),mo=(t,e)=>{let n=H_.encode(t);if(n.length<=e)return{bytes:n,rest:""};let _=0,i=t.length;for(;_<i;){let s=Math.ceil((_+i)/2);H_.encode(t.slice(0,s)).length<=e?_=s:i=s-1}let r=t.slice(0,_);return{bytes:H_.encode(r),rest:t.slice(_)}},ci=(t,e)=>{if(!t.length)return!1;let n=di(e),_=li(n),i=t[0]||"",{bytes:r,rest:s}=mo(i,_.length);return _.fill(0),_.set(r),Atomics.store(n,1,r.length),Atomics.add(n,0,1),Atomics.notify(n,0),s?t[0]=s:t.shift(),!0},fi=t=>{let e=di(t),n=Atomics.load(e,1);if(n===po)return null;let _=li(e);return ho.decode(_.slice(0,n))};var v=0,B_=44,Bt=58,kt=2,ui=4,To=16,pi=32,hi=64,mi=1<<21,go=1<<22,Io=1,Ti=8,gi=4,So=0,Ao=1,yo=2,Eo=789514,ot=class{ready;mem=null;memfs;instance=null;exports;trace=()=>{};debugSession;useJsReadOverlay=!1;useJsSourceReadOverlay=!1;argv;environ;handles=new Map;nextHandle=1024;syntheticFileHandles=new Set;nextSyntheticInode=1;syntheticInodes=new Map;readFileHandles=new Map;writeFileHandles=new Map;constructor(e,n,_,...i){let r=i.at(-1),s=r&&typeof r=="object"?i.pop():{},o=i;this.argv=[_,...o],this.environ={USER:"wasm-clang"},this.memfs=n,this.useJsReadOverlay=_==="wasm-ld"||_==="ld.lld"||_==="lld",this.useJsSourceReadOverlay=_==="clang"||_==="clang++"||_==="cobc";let a=Nn(this,"__wasm_idle_debug_enter","__wasm_idle_debug_leave","__wasm_idle_debug_line","__wasm_idle_debug_value_num","__wasm_idle_debug_value_bool","__wasm_idle_debug_value_addr","__wasm_idle_debug_value_text"),d={...Nn(this,"proc_exit","environ_sizes_get","environ_get","args_sizes_get","args_get","random_get","clock_time_get","poll_oneoff","fd_filestat_set_times","path_filestat_set_times","sock_accept","sock_recv","sock_send","sock_shutdown","path_link","path_rename"),...this.memfs.exports,...Nn(this,"path_open","path_filestat_get","path_readlink","path_unlink_file","fd_fdstat_get","fd_fdstat_set_flags","fd_filestat_get","fd_filestat_set_size","fd_datasync","fd_read","fd_pread","fd_seek","fd_tell","fd_write","fd_close")},l=s.extraImports?.env||{};this.ready=ri(e,{...s.extraImports,wasi_unstable:d,wasi_snapshot_preview1:d,env:{...l,...a}}).then(c=>{this.instance=c,s.instanceRef&&(s.instanceRef.current=c),this.exports=this.instance.exports,this.mem=new cn(this.exports.memory),this.memfs.hostMem=this.mem})}async run(){await this.ready,this.trace(`start(argv=${JSON.stringify(this.argv)}, exports=${JSON.stringify(Object.keys(this.exports||{}))})`);try{this.exports._start()}catch(e){let n=!0;if(e instanceof rt){if(this.trace(`proc_exit(code=${e.code})`),e.code===Eo)return this.trace("allow_rAF_after_exit"),!0;if(this.trace(`disallow_rAF_after_exit(code=${e.code})`),e.code==0)return!1;n=!1}e instanceof it&&this.trace(`not_implemented(${e.message})`);let _=`\x1B[91mError: ${e.message}`;throw n&&(_=_+`
${e.stack}`),_+=`\x1B[0m
`,this.memfs.stdout(_),e}this.trace("start() returned without proc_exit")}proc_exit(e){throw this.trace(`proc_exit_throw(code=${e})`),new rt(e)}toNumber(e){return typeof e=="bigint"?Number(e):e}writeU32(e,n){this.mem.view.setUint32(e,n>>>0,!0)}writeU64(e,n){let _=BigInt(n);this.mem.view.setUint32(e,Number(_&0xffffffffn),!0),this.mem.view.setUint32(e+4,Number(_>>32n&0xffffffffn),!0)}readMemfsFile(e){let n=[e,e.replace(/^\/+/,""),e.replace(/^\.\//,""),e.replace(/^\/+/,"").replace(/^\.\//,"")];for(let _ of n)if(this.memfs.hasFile(_))try{return Uint8Array.from(this.memfs.getFileContents(_))}catch{}return null}shouldUseJsReadForPath(e){return this.useJsReadOverlay?!0:this.useJsSourceReadOverlay}syntheticInodeForPath(e){let _=e.replace(/^\/+/,"").replace(/^\.\//,"")||e,i=this.syntheticInodes.get(_);return i||(i=this.nextSyntheticInode++,this.syntheticInodes.set(_,i)),i}copyFileToIovs(e,n,_,i,r){this.mem.check();let s=0;for(let o=0;o<i;o+=1){let a=this.mem.read32(_);_+=4;let d=this.mem.read32(_);if(_+=4,d<=0)continue;let l=Math.max(0,e.length-n),c=Math.min(d,l);if(c>0&&(this.mem.write(a,e.subarray(n,n+c)),n+=c,s+=c),c<d)break}return this.writeU32(r,s),{copied:s,position:n}}writeRegularFileStat(e,n,_){this.mem.check(),this.writeU64(e,1),this.writeU64(e+8,this.syntheticInodeForPath(_)),this.mem.write8(e+16,gi),this.writeU64(e+24,1),this.writeU64(e+32,n),this.writeU64(e+40,0),this.writeU64(e+48,0),this.writeU64(e+56,0)}seekPosition(e,n,_,i){let r=this.toNumber(_);return i===So?Math.max(0,r):i===Ao?Math.max(0,e+r):i===yo?Math.max(0,n+r):null}ensureWriteCapacity(e,n){if(e.contents.length>=n)return;let _=Math.max(1024,e.contents.length);for(;_<n;)_*=2;let i=new Uint8Array(_);i.set(e.contents.subarray(0,e.size)),e.contents=i}atomicOutputTarget(e){let n=e.match(/^(.+)-[0-9a-f]+(\.[^.]+)\.tmp$/);return n?`${n[1]}${n[2]}`:null}storeFileContents(e,n){if(this.useJsReadOverlay||this.useJsSourceReadOverlay){this.memfs.setFile(e,n);return}this.memfs.addFile(e,n)}path_open(e,n,_,i,r,s,o,a,d){this.mem.check();let l=this.mem.readStr(_,i),c=this.toNumber(s),p=(c&hi)!==0||(r&(Io|Ti))!==0;this.trace(`path_open_request(path=${JSON.stringify(l)}, rights=${c}, oflags=${r}, write=${p})`);let f=!p&&this.shouldUseJsReadForPath(l)&&(c&kt)!==0?this.readMemfsFile(l):null;if(!p&&this.shouldUseJsReadForPath(l)&&(c&kt)!==0&&!f)return this.trace(`path_open_read_missing(path=${JSON.stringify(l)})`),B_;let T=v,I;if(this.useJsReadOverlay&&(p||f))I=this.nextHandle++,this.syntheticFileHandles.add(I),this.writeU32(d,I),this.trace(`path_open_overlay(fd=${I}, path=${JSON.stringify(l)})`);else{if(T=this.memfs.exports.path_open(e,n,_,i,r,s,o,a,d),T!==v)return T;I=this.mem.read32(d)}if(p){let A=(r&Ti)===0?this.readMemfsFile(l):null,b=A?Uint8Array.from(A):new Uint8Array(0);return this.writeFileHandles.set(I,{path:l,contents:b,position:0,size:b.length}),this.readFileHandles.delete(I),this.trace(`path_open_write(fd=${I}, path=${JSON.stringify(l)}, size=${b.length})`),T}if(!this.shouldUseJsReadForPath(l)||(c&kt)===0)return T;let m=f||this.readMemfsFile(l);return m&&(this.readFileHandles.set(I,{path:l,contents:m,position:0}),this.trace(`path_open_read(fd=${I}, path=${JSON.stringify(l)}, size=${m.length})`)),T}path_filestat_get(e,n,_,i,r){this.mem.check();let s=this.mem.readStr(_,i);if(!this.shouldUseJsReadForPath(s))return this.memfs.exports.path_filestat_get(e,n,_,i,r);let o=this.readMemfsFile(s);return o?(this.writeRegularFileStat(r,o.length,s),this.trace(`path_filestat_get(path=${JSON.stringify(s)}, size=${o.length})`),v):this.memfs.exports.path_filestat_get(e,n,_,i,r)}fd_fdstat_get(e,n){let _=this.readFileHandles.get(e)||this.writeFileHandles.get(e);if(!_)return this.memfs.exports.fd_fdstat_get(e,n);let i=this.writeFileHandles.has(e)?hi|ui|pi|To|mi|go:kt|ui|pi|mi;return this.mem.check(),this.mem.write8(n,gi),this.mem.write8(n+1,0),this.mem.write8(n+2,0),this.mem.write8(n+3,0),this.writeU64(n+8,i),this.writeU64(n+16,0),this.trace(`fd_fdstat_get(fd=${e}, path=${JSON.stringify(_.path)})`),v}fd_filestat_get(e,n){let _=this.writeFileHandles.get(e),i=this.readFileHandles.get(e),r=_||i;if(!r)return this.memfs.exports.fd_filestat_get(e,n);let s=_?_.size:i?.contents.length||0;return this.writeRegularFileStat(n,s,r.path),this.trace(`fd_filestat_get(fd=${e}, path=${JSON.stringify(r.path)}, size=${s})`),v}fd_filestat_set_size(e,n){let _=this.writeFileHandles.get(e);if(!_)return this.memfs.exports.fd_filestat_set_size(e,n);let i=this.toNumber(n);return this.ensureWriteCapacity(_,i),i>_.size&&_.contents.fill(0,_.size,i),_.size=i,_.position>i&&(_.position=i),this.trace(`fd_filestat_set_size(fd=${e}, size=${i})`),v}fd_read(e,n,_,i){let r=this.readFileHandles.get(e);if(!r)return this.memfs.exports.fd_read(e,n,_,i);let s=this.copyFileToIovs(r.contents,r.position,n,_,i);return r.position=s.position,this.trace(`fd_read(fd=${e}, bytes=${s.copied})`),v}fd_pread(e,n,_,i,r){let s=this.readFileHandles.get(e);if(!s)return this.memfs.exports.fd_pread(e,n,_,i,r);let o=this.copyFileToIovs(s.contents,this.toNumber(i),n,_,r);return this.trace(`fd_pread(fd=${e}, offset=${this.toNumber(i)}, bytes=${o.copied})`),v}fd_seek(e,n,_,i){let r=this.writeFileHandles.get(e);if(r){let a=this.seekPosition(r.position,r.size,n,_);return a==null?this.memfs.exports.fd_seek(e,n,_,i):(r.position=a,this.mem.check(),this.writeU64(i,r.position),this.trace(`fd_seek_write(fd=${e}, offset=${this.toNumber(n)}, whence=${_})`),v)}let s=this.readFileHandles.get(e);if(!s)return this.memfs.exports.fd_seek(e,n,_,i);let o=this.seekPosition(s.position,s.contents.length,n,_);return o==null?this.memfs.exports.fd_seek(e,n,_,i):(s.position=o,this.mem.check(),this.writeU64(i,s.position),this.trace(`fd_seek(fd=${e}, offset=${this.toNumber(n)}, whence=${_})`),v)}fd_tell(e,n){let _=this.writeFileHandles.get(e)?.position??this.readFileHandles.get(e)?.position;if(_==null){let i=this.memfs.exports.fd_tell;return typeof i=="function"?i(e,n):B_}return this.mem.check(),this.writeU64(n,_),this.trace(`fd_tell(fd=${e}, offset=${_})`),v}fd_datasync(e){if(this.writeFileHandles.has(e)||this.readFileHandles.has(e))return v;let n=this.memfs.exports.fd_datasync;return typeof n=="function"?n(e):v}fd_fdstat_set_flags(e,n){if(this.writeFileHandles.has(e)||this.readFileHandles.has(e))return v;let _=this.memfs.exports.fd_fdstat_set_flags;return typeof _=="function"?_(e,n):v}path_readlink(e,n,_,i,r,s){return this.mem.check(),this.writeU32(s,0),this.trace(`path_readlink(path=${JSON.stringify(this.mem.readStr(n,_))})`),B_}path_unlink_file(e,n,_){this.mem.check();let i=this.mem.readStr(n,_);return this.trace(`path_unlink_file(path=${JSON.stringify(i)})`),v}fd_write(e,n,_,i){let r=this.writeFileHandles.get(e);if(!r)return this.memfs.exports.fd_write(e,n,_,i);this.mem.check();let s=0;for(let o=0;o<_;o+=1){let a=this.mem.read32(n);n+=4;let d=this.mem.read32(n);n+=4,!(d<=0)&&(this.ensureWriteCapacity(r,r.position+d),r.contents.set(new Uint8Array(this.mem.buffer,a,d),r.position),r.position+=d,r.size=Math.max(r.size,r.position),s+=d)}return this.writeU32(i,s),this.trace(`fd_write(fd=${e}, bytes=${s})`),v}fd_close(e){let n=this.syntheticFileHandles.delete(e);if(this.readFileHandles.has(e)){this.readFileHandles.delete(e);let i=n?v:this.memfs.exports.fd_close(e);return this.trace(`fd_close_read(fd=${e}, close=${i})`),i}let _=this.writeFileHandles.get(e);if(_){this.writeFileHandles.delete(e);let i=n?v:this.memfs.exports.fd_close(e),r=_.contents.subarray(0,_.size);this.storeFileContents(_.path,r);let s=this.atomicOutputTarget(_.path);return s&&this.storeFileContents(s,r),this.trace(`fd_close_write(fd=${e}, path=${JSON.stringify(_.path)}, size=${_.size}, close=${i}, target=${JSON.stringify(s)})`),v}return n?v:this.memfs.exports.fd_close(e)}debugEvaluate(e){let n=this.debugSession;if(!n)throw new Error("unavailable");let _=[...n.frames].reverse().find(o=>o.functionId===n.currentFunctionId),i=n.currentLine,r=[...n.variableMetadata[n.currentFunctionId]||[]].reverse().filter(o=>i>=o.fromLine&&i<=o.toLine),s=[...n.globalVariableMetadata||[]].reverse().filter(o=>i>=o.fromLine&&i<=o.toLine);return oi(e,o=>{let a=(p,f)=>{let T=p.dimensions?.length?p.dimensions:p.length?[p.length]:[],I=Number(f);if(!Number.isFinite(I)||I<=0||!T.length||!p.elementKind&&!p.structFields?.length)throw new Error("unavailable");this.mem?.check?.();let m=p.structFields?.length&&p.structSize?p.structSize:p.elementKind==="double"?8:p.elementKind==="bool"||p.elementKind==="char"?1:4,A=(u,g)=>{if(u==="bool")return!!this.mem.read8(g);if(u==="char"){let h=this.mem.read8(g);return h>=32&&h<=126?String.fromCharCode(h):h}return u==="float"?this.mem.readFloat32(g):u==="double"?this.mem.readFloat64(g):this.mem.readInt32(g)},b=u=>({__debugExpressionKind:"object",has:g=>!!p.structFields?.some(h=>h.name===g),get:g=>{let h=p.structFields?.find(y=>y.name===g);if(!h)throw new Error("unavailable");return A(h.kind,u+h.offset)},keys:()=>p.structFields?.map(g=>g.name)||[]}),E=(u,g)=>({__debugExpressionKind:"array",length:g[0],truncated:g[0]>8,get:h=>{if(!Number.isInteger(h)||h<0||h>=g[0])throw new Error("unavailable");if(g.length>1){let y=g.slice(1).reduce((S,N)=>S*N,1)*m;return E(u+h*y,g.slice(1))}if(p.structFields?.length&&p.structSize)return b(u+h*p.structSize);if(!p.elementKind)throw new Error("unavailable");return A(p.elementKind,u+h*m)},keys:()=>Array.from({length:Math.min(g[0],8)},(h,y)=>y)});return E(I,T)},d=(p,f)=>{if(f==null||f==="?")throw new Error("unavailable");return p.kind==="array"?a(p,f):si(f)},l=r.find(p=>p.name===o);if(l)return d(l,_?.values.get(l.slot));let c=s.find(p=>p.name===o);if(c)return d(c,n.globalValues.get(c.slot));throw new Error("unavailable")})}pauseDebugSession(e,n,_,i){let r=e.buffer;if(!r)return v;e.currentFunctionId=n,e.currentLine=_;let s=[...e.frames].reverse().find(f=>f.functionId===n);s&&(s.line=_),e.pauseOnEntry=!1,e.stepArmed=!1,e.nextLineArmed=!1,e.nextLineDepth=0,e.stepOutArmed=!1,this.trace(`pause(function=${n}, line=${_}, reason=${i})`);let o=e.variableMetadata[n]?.flatMap(f=>{if(_<f.fromLine||_>f.toLine)return[];if(f.kind==="array"){this.mem?.check?.();let I=Number(s?.values.get(f.slot)??Number.NaN),m=f.dimensions?.length?f.dimensions:f.length?[f.length]:[];if(!Number.isFinite(I)||I<=0||!m.length||!f.elementKind&&!f.structFields?.length)return[{name:f.name,value:"?"}];if(f.structFields?.length&&f.structSize){let u=Math.min(m[0],8),g=[];for(let h=0;h<u;h+=1){let y=[];for(let S of f.structFields){let N=I+h*f.structSize+S.offset;if(S.kind==="bool"){y.push(`${S.name}: ${this.mem.read8(N)?"true":"false"}`);continue}if(S.kind==="char"){let x=this.mem.read8(N);y.push(`${S.name}: ${x>=32&&x<=126?`'${String.fromCharCode(x)}'`:`${x}`}`);continue}if(S.kind==="float"){y.push(`${S.name}: ${this.mem.readFloat32(N)}`);continue}if(S.kind==="double"){y.push(`${S.name}: ${this.mem.readFloat64(N)}`);continue}y.push(`${S.name}: ${this.mem.readInt32(N)}`)}g.push(`{${y.join(", ")}}`)}return[{name:f.name,value:`[${g.join(", ")}${m[0]>u?", ...":""}]`}]}if(!f.elementKind)return[{name:f.name,value:"?"}];let A=f.elementKind==="double"?8:f.elementKind==="bool"||f.elementKind==="char"?1:4;if(m.length===2){let u=Math.min(m[0],4),g=Math.min(m[1],8),h=[];for(let y=0;y<u;y+=1){let S=[];for(let N=0;N<g;N+=1){let x=I+(y*m[1]+N)*A;if(f.elementKind==="bool"){S.push(this.mem.read8(x)?"true":"false");continue}if(f.elementKind==="char"){let M=this.mem.read8(x);S.push(M>=32&&M<=126?`'${String.fromCharCode(M)}'`:`${M}`);continue}if(f.elementKind==="float"){S.push(`${this.mem.readFloat32(x)}`);continue}if(f.elementKind==="double"){S.push(`${this.mem.readFloat64(x)}`);continue}S.push(`${this.mem.readInt32(x)}`)}h.push(`[${S.join(", ")}${m[1]>g?", ...":""}]`)}return[{name:f.name,value:`[${h.join(", ")}${m[0]>u?", ...":""}]`}]}let b=Math.min(m[0],8),E=[];for(let u=0;u<b;u+=1){let g=I+u*A;if(f.elementKind==="bool"){E.push(this.mem.read8(g)?"true":"false");continue}if(f.elementKind==="char"){let h=this.mem.read8(g);E.push(h>=32&&h<=126?`'${String.fromCharCode(h)}'`:`${h}`);continue}if(f.elementKind==="float"){E.push(`${this.mem.readFloat32(g)}`);continue}if(f.elementKind==="double"){E.push(`${this.mem.readFloat64(g)}`);continue}E.push(`${this.mem.readInt32(g)}`)}return[{name:f.name,value:`[${E.join(", ")}${m[0]>b?", ...":""}]`}]}let T=s?.values.get(f.slot)??"?";return[{name:f.name,value:T}]})||[],a=new Set(o.map(f=>f.name)),d=(e.globalVariableMetadata||[]).flatMap(f=>{if(a.has(f.name))return[];if(_<f.fromLine||_>f.toLine)return[];if(f.kind==="array"){this.mem?.check?.();let I=Number(e.globalValues?.get(f.slot)??Number.NaN),m=f.dimensions?.length?f.dimensions:f.length?[f.length]:[];if(!Number.isFinite(I)||I<=0||!m.length||!f.elementKind&&!f.structFields?.length)return[{name:f.name,value:"?"}];if(f.structFields?.length&&f.structSize){let u=Math.min(m[0],8),g=[];for(let h=0;h<u;h+=1){let y=[];for(let S of f.structFields){let N=I+h*f.structSize+S.offset;if(S.kind==="bool"){y.push(`${S.name}: ${this.mem.read8(N)?"true":"false"}`);continue}if(S.kind==="char"){let x=this.mem.read8(N);y.push(`${S.name}: ${x>=32&&x<=126?`'${String.fromCharCode(x)}'`:`${x}`}`);continue}if(S.kind==="float"){y.push(`${S.name}: ${this.mem.readFloat32(N)}`);continue}if(S.kind==="double"){y.push(`${S.name}: ${this.mem.readFloat64(N)}`);continue}y.push(`${S.name}: ${this.mem.readInt32(N)}`)}g.push(`{${y.join(", ")}}`)}return[{name:f.name,value:`[${g.join(", ")}${m[0]>u?", ...":""}]`}]}if(!f.elementKind)return[{name:f.name,value:"?"}];let A=f.elementKind==="double"?8:f.elementKind==="bool"||f.elementKind==="char"?1:4;if(m.length===2){let u=Math.min(m[0],4),g=Math.min(m[1],8),h=[];for(let y=0;y<u;y+=1){let S=[];for(let N=0;N<g;N+=1){let x=I+(y*m[1]+N)*A;if(f.elementKind==="bool"){S.push(this.mem.read8(x)?"true":"false");continue}if(f.elementKind==="char"){let M=this.mem.read8(x);S.push(M>=32&&M<=126?`'${String.fromCharCode(M)}'`:`${M}`);continue}if(f.elementKind==="float"){S.push(`${this.mem.readFloat32(x)}`);continue}if(f.elementKind==="double"){S.push(`${this.mem.readFloat64(x)}`);continue}S.push(`${this.mem.readInt32(x)}`)}h.push(`[${S.join(", ")}${m[1]>g?", ...":""}]`)}return[{name:f.name,value:`[${h.join(", ")}${m[0]>u?", ...":""}]`}]}let b=Math.min(m[0],8),E=[];for(let u=0;u<b;u+=1){let g=I+u*A;if(f.elementKind==="bool"){E.push(this.mem.read8(g)?"true":"false");continue}if(f.elementKind==="char"){let h=this.mem.read8(g);E.push(h>=32&&h<=126?`'${String.fromCharCode(h)}'`:`${h}`);continue}if(f.elementKind==="float"){E.push(`${this.mem.readFloat32(g)}`);continue}if(f.elementKind==="double"){E.push(`${this.mem.readFloat64(g)}`);continue}E.push(`${this.mem.readInt32(g)}`)}return[{name:f.name,value:`[${E.join(", ")}${m[0]>b?", ...":""}]`}]}let T=e.globalValues?.get(f.slot)??"?";return[{name:f.name,value:T}]})||[],l=new Map(o.map(f=>[f.name,f])),c=new Map(d.map(f=>[f.name,f]));for(let f of l.keys())c.delete(f);e.onPause?.({type:"pause",line:_,reason:i,locals:[...l.values(),...c.values()],callStack:[...e.frames].reverse().map(f=>({functionName:f.functionName,line:f.line}))});let p=Atomics.load(r,0);for(;;){if(e.interruptBuffer?.[0]===2)throw new hn;if(Atomics.wait(r,0,p,100),e.interruptBuffer?.[0]===2)throw new hn;let f=Atomics.exchange(r,1,0);if(f===1)return e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,v;if(f===2)return e.stepArmed=!0,e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,v;if(f===3)return e.nextLineArmed=!0,e.nextLineFunctionId=e.currentFunctionId,e.nextLineLine=e.currentLine,e.nextLineDepth=e.callDepth,e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,v;if(f===4)return e.stepOutArmed=!0,e.stepOutDepth=Math.max(0,e.callDepth-1),e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,v;if(f===5){let T=e.watchBuffer?fi(e.watchBuffer):"",I="?";try{I=T?this.debugEvaluate(T):"?"}catch(m){I=m instanceof Error&&m.message==="unavailable"?"?":"error"}e.watchResultBuffer&&ci([I],e.watchResultBuffer)}}}__wasm_idle_debug_enter(e,n){let _=this.debugSession;return _?.buffer?(_.callDepth+=1,_.currentFunctionId=e,_.currentLine=n,_.frames.push({functionId:e,functionName:_.functionMetadata[e]||`fn_${e}`,line:n,values:new Map}),this.trace(`enter(function=${e}, line=${n}, depth=${_.callDepth})`),_.pauseOnEntry?this.pauseDebugSession(_,e,n,"entry"):_.stepArmed?this.pauseDebugSession(_,e,n,"step"):v):v}__wasm_idle_debug_leave(e){let n=this.debugSession;if(!n?.buffer)return v;this.trace(`leave(function=${e}, depth=${n.callDepth})`),n.nextLineArmed&&e===n.nextLineFunctionId&&n.callDepth<=(n.nextLineDepth??n.callDepth)&&(n.nextLineArmed=!1,n.nextLineDepth=0,n.stepArmed=!0),n.callDepth=Math.max(0,n.callDepth-1),n.currentFunctionId===e&&(n.currentFunctionId=0);for(let _=n.frames.length-1;_>=0;_-=1)if(n.frames[_]?.functionId===e){n.frames.splice(_,1);break}return v}__wasm_idle_debug_value_num(e,n,_){let i=this.debugSession;if(!i?.buffer)return v;if(e===0)return i.globalValues.set(n,Number.isInteger(_)?String(_):`${_}`),v;for(let r=i.frames.length-1;r>=0;r-=1){let s=i.frames[r];if(s?.functionId===e){s.values.set(n,Number.isInteger(_)?String(_):`${_}`);break}}return v}__wasm_idle_debug_value_bool(e,n,_){let i=this.debugSession;if(!i?.buffer)return v;if(e===0)return i.globalValues.set(n,_?"true":"false"),v;for(let r=i.frames.length-1;r>=0;r-=1){let s=i.frames[r];if(s?.functionId===e){s.values.set(n,_?"true":"false");break}}return v}__wasm_idle_debug_value_addr(e,n,_){let i=this.debugSession;if(!i?.buffer)return v;if(e===0)return i.globalValues.set(n,String(_>>>0)),v;for(let r=i.frames.length-1;r>=0;r-=1){let s=i.frames[r];if(s?.functionId===e){s.values.set(n,String(_>>>0));break}}return v}__wasm_idle_debug_value_text(e,n,_,i){let r=this.debugSession;if(!r?.buffer)return v;this.mem?.check?.();let s=this.mem?.readStr?this.mem.readStr(_,i):"?";if(e===0)return r.globalValues.set(n,s),v;for(let o=r.frames.length-1;o>=0;o-=1){let a=r.frames[o];if(a?.functionId===e){a.values.set(n,s);break}}return v}__wasm_idle_debug_line(e,n){let _=this.debugSession;if(!_?.buffer)return v;let i=Atomics.load(_.buffer,2);if(i!==_.breakpointVersion){let s=Math.max(0,Atomics.load(_.buffer,3)),o=new Set;for(let a=0;a<s&&a+4<_.buffer.length;a+=1){let d=Atomics.load(_.buffer,a+4);d>0&&o.add(d)}_.breakpoints=o,_.breakpointVersion=i}if(_.resumeSkipActive){if(e===_.resumeSkipFunctionId&&n===_.resumeSkipLine)return v;_.resumeSkipActive=!1,_.resumeSkipFunctionId=0,_.resumeSkipLine=0}let r="";return _.pauseOnEntry?r="entry":_.breakpoints.has(n)?r="breakpoint":_.stepArmed?r="step":_.nextLineArmed&&_.callDepth<=(_.nextLineDepth??_.callDepth)&&e===_.nextLineFunctionId&&n!==_.nextLineLine?r="nextLine":_.stepOutArmed&&_.callDepth<=_.stepOutDepth&&(r="stepOut"),r?this.pauseDebugSession(_,e,n,r):v}environ_sizes_get(e,n){this.mem.check();let _=0,i=Object.getOwnPropertyNames(this.environ);for(let r of i){let s=this.environ[r];_+=r.length+s.length+2}return this.mem.write32(e,i.length),this.mem.write32(n,_),this.trace(`environ_sizes_get(count=${i.length}, bytes=${_})`),v}environ_get(e,n){this.mem.check();let _=Object.getOwnPropertyNames(this.environ);this.trace(`environ_get(entries=${JSON.stringify(_)})`);for(let i of _)this.mem.write32(e,n),e+=4,n+=this.mem.writeStr(n,`${i}=${this.environ[i]}`);return v}args_sizes_get(e,n){this.mem.check();let _=0;for(let i of this.argv)_+=i.length+1;return this.mem.write32(e,this.argv.length),this.mem.write32(n,_),this.trace(`args_sizes_get(count=${this.argv.length}, bytes=${_})`),v}args_get(e,n){this.mem.check(),this.trace(`args_get(argv=${JSON.stringify(this.argv)})`);for(let _ of this.argv)this.mem.write32(e,n),e+=4,n+=this.mem.writeStr(n,_);return v}random_get(e,n){let _=new Uint8Array(this.mem.buffer,e,n);for(let i=0;i<n;++i)_[i]=Math.random()*256|0}clock_time_get(e,n,_){this.mem.check();let i=e===1&&typeof performance<"u"?performance.now():Date.now(),r=BigInt(Math.floor(i*1e6));return this.mem.view.setBigUint64(_,r,!0),this.trace(`clock_time_get(clock=${e}, ns=${r})`),v}poll_oneoff(){throw new it("wasi_unstable","poll_oneoff")}fd_filestat_set_times(){return this.trace("fd_filestat_set_times()"),v}path_filestat_set_times(){return this.trace("path_filestat_set_times()"),v}sock_accept(){return this.trace("sock_accept() unsupported"),Bt}sock_recv(){return this.trace("sock_recv() unsupported"),Bt}sock_send(){return this.trace("sock_send() unsupported"),Bt}sock_shutdown(){return this.trace("sock_shutdown() unsupported"),Bt}path_link(e,n,_,i,r,s,o){this.mem.check();let a=this.mem.readStr(_,i).replace(/^\/+/,""),d=this.mem.readStr(s,o).replace(/^\/+/,"");return this.trace(`path_link(source=${JSON.stringify(a)}, target=${JSON.stringify(d)})`),this.storeFileContents(d,new Uint8Array(this.memfs.getFileContents(a))),v}path_rename(e,n,_,i,r,s){this.mem.check();let o=this.mem.readStr(n,_).replace(/^\/+/,""),a=this.mem.readStr(r,s).replace(/^\/+/,"");return this.trace(`path_rename(source=${JSON.stringify(o)}, target=${JSON.stringify(a)})`),this.storeFileContents(a,new Uint8Array(this.memfs.getFileContents(o))),v}};var Si="wasm32-wasi",Ai=["-fobjc-runtime=gnustep-2.0","-fblocks"];var No="-std=gnu++20",bo="-std=gnu11";function yi(t){return(t||"").trim().toUpperCase().replaceAll(/\s+/g,"")}function xo(t){switch(yi(t)){case"03":case"CPP03":case"C++03":case"GNU++03":case"GNUC++03":return"-std=gnu++03";case"11":case"CPP11":case"C++11":case"GNU++11":case"GNUC++11":return"-std=gnu++11";case"14":case"CPP14":case"C++14":case"GNU++14":case"GNUC++14":return"-std=gnu++14";case"17":case"CPP17":case"C++17":case"GNU++17":case"GNUC++17":return"-std=gnu++17";case"20":case"CPP20":case"C++20":case"GNU++20":case"GNUC++20":return"-std=gnu++20";case"23":case"CPP23":case"C++23":case"GNU++23":case"GNUC++23":return"-std=gnu++23";case"26":case"CPP26":case"C++26":case"GNU++26":case"GNUC++26":return"-std=gnu++26";default:return No}}function Ii(t){switch(yi(t)){case"99":case"C99":case"GNU99":case"GNUC99":return"-std=gnu99";case"11":case"C11":case"GNU11":case"GNUC11":return"-std=gnu11";case"17":case"18":case"C17":case"C18":case"GNU17":case"GNU18":case"GNUC17":case"GNUC18":return"-std=gnu17";default:return bo}}function Ei(t,e){return t==="C"?{languageArg:"c",standardArg:Ii(e.cVersion)}:t==="OBJC"?{languageArg:"objective-c",standardArg:Ii(e.cVersion)}:{languageArg:"c++",standardArg:xo(e.cppVersion)}}function Ni(t,e="",n){return[...["CPP","OBJCXX"].includes(t)?[`${e}/include/c++/v1`,`${e}/include/wasm32-wasi/c++/v1`]:[],...n?[`${n.replace(/\/+$/,"")}/include`]:[],`${e}/include/wasm32-wasi`,`${e}/include`]}var wo=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_TREE_POLICY_HPP
#define WASM_CLANG_EXT_PB_DS_TREE_POLICY_HPP

#include <cstddef>

namespace __gnu_pbds {

struct null_type {};
struct rb_tree_tag {};
struct splay_tree_tag {};
struct ov_tree_tag {};

template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn, typename Allocator>
class null_node_update {
public:
	typedef Node_CItr node_const_iterator;
	typedef Node_Itr node_iterator;
	typedef Cmp_Fn cmp_fn;
	typedef Allocator allocator_type;
};

template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn, typename Allocator>
class tree_order_statistics_node_update {
public:
	typedef Node_CItr node_const_iterator;
	typedef Node_Itr node_iterator;
	typedef Cmp_Fn cmp_fn;
	typedef Allocator allocator_type;
};

} // namespace __gnu_pbds

#endif
`,Lo=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_ASSOC_CONTAINER_HPP
#define WASM_CLANG_EXT_PB_DS_ASSOC_CONTAINER_HPP

#include <algorithm>
#include <cstddef>
#include <functional>
#include <iterator>
#include <map>
#include <memory>
#include <set>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <ext/pb_ds/tree_policy.hpp>

namespace __gnu_pbds {

namespace detail {

template <typename Allocator, typename Value>
struct rebind_allocator {
	typedef typename std::allocator_traits<Allocator>::template rebind_alloc<Value> type;
};

template <typename Iterator>
Iterator advance_to_order(Iterator first, Iterator last, std::size_t order) {
	if (order >= static_cast<std::size_t>(std::distance(first, last))) return last;
	std::advance(
		first,
		static_cast<typename std::iterator_traits<Iterator>::difference_type>(order)
	);
	return first;
}

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn,
	typename Eq_Fn,
	typename Allocator
>
struct hash_table_selector {
	typedef std::pair<const Key, Mapped> value_type;
	typedef typename rebind_allocator<Allocator, value_type>::type allocator_type;
	typedef std::unordered_map<Key, Mapped, Hash_Fn, Eq_Fn, allocator_type> type;
};

template <typename Key, typename Hash_Fn, typename Eq_Fn, typename Allocator>
struct hash_table_selector<Key, null_type, Hash_Fn, Eq_Fn, Allocator> {
	typedef typename rebind_allocator<Allocator, Key>::type allocator_type;
	typedef std::unordered_set<Key, Hash_Fn, Eq_Fn, allocator_type> type;
};

} // namespace detail

template <
	typename Key,
	typename Mapped,
	typename Cmp_Fn = std::less<Key>,
	typename Tag = rb_tree_tag,
	template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn_, typename Allocator_>
	class Node_Update = null_node_update,
	typename Allocator = std::allocator<char>
>
class tree {
public:
	typedef Key key_type;
	typedef Mapped mapped_type;
	typedef std::pair<const Key, Mapped> value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;

private:
	typedef typename detail::rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::map<Key, Mapped, Cmp_Fn, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator iterator;
	typedef typename container_type::const_iterator const_iterator;
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;
	typedef typename container_type::reverse_iterator reverse_iterator;
	typedef typename container_type::const_reverse_iterator const_reverse_iterator;

	tree() = default;
	explicit tree(const Cmp_Fn& compare) : values_(compare) {}

	template <typename InputIt>
	tree(InputIt first, InputIt last) : values_(first, last) {}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	size_type max_size() const { return values_.max_size(); }

	iterator begin() { return values_.begin(); }
	const_iterator begin() const { return values_.begin(); }
	const_iterator cbegin() const { return values_.cbegin(); }
	iterator end() { return values_.end(); }
	const_iterator end() const { return values_.end(); }
	const_iterator cend() const { return values_.cend(); }
	reverse_iterator rbegin() { return values_.rbegin(); }
	const_reverse_iterator rbegin() const { return values_.rbegin(); }
	reverse_iterator rend() { return values_.rend(); }
	const_reverse_iterator rend() const { return values_.rend(); }

	std::pair<iterator, bool> insert(const value_type& value) { return values_.insert(value); }
	std::pair<iterator, bool> insert(value_type&& value) { return values_.insert(std::move(value)); }

	template <typename InputIt>
	void insert(InputIt first, InputIt last) {
		values_.insert(first, last);
	}

	mapped_type& operator[](const key_type& key) { return values_[key]; }
	mapped_type& at(const key_type& key) { return values_.at(key); }
	const mapped_type& at(const key_type& key) const { return values_.at(key); }

	iterator find(const key_type& key) { return values_.find(key); }
	const_iterator find(const key_type& key) const { return values_.find(key); }
	bool contains(const key_type& key) const { return values_.find(key) != values_.end(); }
	size_type count(const key_type& key) const { return values_.count(key); }

	iterator lower_bound(const key_type& key) { return values_.lower_bound(key); }
	const_iterator lower_bound(const key_type& key) const { return values_.lower_bound(key); }
	iterator upper_bound(const key_type& key) { return values_.upper_bound(key); }
	const_iterator upper_bound(const key_type& key) const { return values_.upper_bound(key); }

	size_type erase(const key_type& key) { return values_.erase(key); }
	iterator erase(const_iterator position) { return values_.erase(position); }
	iterator erase(const_iterator first, const_iterator last) { return values_.erase(first, last); }
	void clear() { values_.clear(); }
	void swap(tree& other) { values_.swap(other.values_); }

	iterator find_by_order(size_type order) {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	const_iterator find_by_order(size_type order) const {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	size_type order_of_key(const key_type& key) const {
		return static_cast<size_type>(std::distance(values_.begin(), values_.lower_bound(key)));
	}

	void join(tree& other) {
		values_.insert(other.values_.begin(), other.values_.end());
		other.values_.clear();
	}

	void split(const key_type& key, tree& other) {
		iterator first = values_.upper_bound(key);
		other.values_.insert(first, values_.end());
		values_.erase(first, values_.end());
	}

private:
	container_type values_;
};

template <
	typename Key,
	typename Cmp_Fn,
	typename Tag,
	template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn_, typename Allocator_>
	class Node_Update,
	typename Allocator
>
class tree<Key, null_type, Cmp_Fn, Tag, Node_Update, Allocator> {
public:
	typedef Key key_type;
	typedef null_type mapped_type;
	typedef Key value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;

private:
	typedef typename detail::rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::set<Key, Cmp_Fn, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator iterator;
	typedef typename container_type::const_iterator const_iterator;
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;
	typedef typename container_type::reverse_iterator reverse_iterator;
	typedef typename container_type::const_reverse_iterator const_reverse_iterator;

	tree() = default;
	explicit tree(const Cmp_Fn& compare) : values_(compare) {}

	template <typename InputIt>
	tree(InputIt first, InputIt last) : values_(first, last) {}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	size_type max_size() const { return values_.max_size(); }

	iterator begin() { return values_.begin(); }
	const_iterator begin() const { return values_.begin(); }
	const_iterator cbegin() const { return values_.cbegin(); }
	iterator end() { return values_.end(); }
	const_iterator end() const { return values_.end(); }
	const_iterator cend() const { return values_.cend(); }
	reverse_iterator rbegin() { return values_.rbegin(); }
	const_reverse_iterator rbegin() const { return values_.rbegin(); }
	reverse_iterator rend() { return values_.rend(); }
	const_reverse_iterator rend() const { return values_.rend(); }

	std::pair<iterator, bool> insert(const value_type& value) { return values_.insert(value); }
	std::pair<iterator, bool> insert(value_type&& value) { return values_.insert(std::move(value)); }

	template <typename InputIt>
	void insert(InputIt first, InputIt last) {
		values_.insert(first, last);
	}

	iterator find(const key_type& key) { return values_.find(key); }
	const_iterator find(const key_type& key) const { return values_.find(key); }
	bool contains(const key_type& key) const { return values_.find(key) != values_.end(); }
	size_type count(const key_type& key) const { return values_.count(key); }

	iterator lower_bound(const key_type& key) { return values_.lower_bound(key); }
	const_iterator lower_bound(const key_type& key) const { return values_.lower_bound(key); }
	iterator upper_bound(const key_type& key) { return values_.upper_bound(key); }
	const_iterator upper_bound(const key_type& key) const { return values_.upper_bound(key); }

	size_type erase(const key_type& key) { return values_.erase(key); }
	iterator erase(const_iterator position) { return values_.erase(position); }
	iterator erase(const_iterator first, const_iterator last) { return values_.erase(first, last); }
	void clear() { values_.clear(); }
	void swap(tree& other) { values_.swap(other.values_); }

	iterator find_by_order(size_type order) {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	const_iterator find_by_order(size_type order) const {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	size_type order_of_key(const key_type& key) const {
		return static_cast<size_type>(std::distance(values_.begin(), values_.lower_bound(key)));
	}

	void join(tree& other) {
		values_.insert(other.values_.begin(), other.values_.end());
		other.values_.clear();
	}

	void split(const key_type& key, tree& other) {
		iterator first = values_.upper_bound(key);
		other.values_.insert(first, values_.end());
		values_.erase(first, values_.end());
	}

private:
	container_type values_;
};

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn = std::hash<Key>,
	typename Eq_Fn = std::equal_to<Key>,
	typename Comb_Hash_Fn = void,
	typename Resize_Policy = void,
	bool Store_Hash = false,
	typename Allocator = std::allocator<char>
>
using gp_hash_table = typename detail::hash_table_selector<
	Key,
	Mapped,
	Hash_Fn,
	Eq_Fn,
	Allocator
>::type;

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn = std::hash<Key>,
	typename Eq_Fn = std::equal_to<Key>,
	typename Comb_Hash_Fn = void,
	typename Resize_Policy = void,
	bool Store_Hash = false,
	typename Allocator = std::allocator<char>
>
using cc_hash_table = typename detail::hash_table_selector<
	Key,
	Mapped,
	Hash_Fn,
	Eq_Fn,
	Allocator
>::type;

} // namespace __gnu_pbds

#endif
`,Ro=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_HASH_POLICY_HPP
#define WASM_CLANG_EXT_PB_DS_HASH_POLICY_HPP

#include <cstddef>

namespace __gnu_pbds {

template <typename Size_Type = std::size_t>
class direct_mask_range_hashing {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class direct_mod_range_hashing {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class linear_probe_fn {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class quadratic_probe_fn {
public:
	typedef Size_Type size_type;
};

class hash_exponential_size_policy {};
class hash_prime_size_policy {};

template <bool External_Load_Access = false, typename Size_Type = std::size_t>
class hash_load_check_resize_trigger {
public:
	typedef Size_Type size_type;
	explicit hash_load_check_resize_trigger(float = 0.125, float = 0.5) {}
};

template <bool External_Load_Access = false, typename Size_Type = std::size_t>
class cc_hash_max_collision_check_resize_trigger {
public:
	typedef Size_Type size_type;
	explicit cc_hash_max_collision_check_resize_trigger(float = 0.5) {}
};

template <
	typename Size_Policy = hash_exponential_size_policy,
	typename Trigger_Policy = hash_load_check_resize_trigger<>,
	bool External_Size_Access = false,
	typename Size_Type = std::size_t
>
class hash_standard_resize_policy {
public:
	typedef Size_Type size_type;
	hash_standard_resize_policy() = default;
	explicit hash_standard_resize_policy(const Size_Policy&) {}
	hash_standard_resize_policy(const Size_Policy&, const Trigger_Policy&) {}
};

} // namespace __gnu_pbds

#endif
`,Co=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_PRIORITY_QUEUE_HPP
#define WASM_CLANG_EXT_PB_DS_PRIORITY_QUEUE_HPP

#include <algorithm>
#include <cstddef>
#include <functional>
#include <memory>
#include <queue>
#include <utility>
#include <vector>

namespace __gnu_pbds {

struct pairing_heap_tag {};
struct binary_heap_tag {};
struct binomial_heap_tag {};
struct rc_binomial_heap_tag {};
struct thin_heap_tag {};

namespace detail {

template <typename Allocator, typename Value>
struct priority_queue_rebind_allocator {
	typedef typename std::allocator_traits<Allocator>::template rebind_alloc<Value> type;
};

} // namespace detail

template <
	typename Value_Type,
	typename Cmp_Fn = std::less<Value_Type>,
	typename Tag = pairing_heap_tag,
	typename Allocator = std::allocator<char>
>
class priority_queue {
public:
	typedef Value_Type value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;
	typedef value_type& reference;
	typedef const value_type& const_reference;

private:
	typedef typename detail::priority_queue_rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::vector<value_type, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;

	priority_queue() : values_(), compare_() {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	explicit priority_queue(const Cmp_Fn& compare) : values_(), compare_(compare) {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	template <typename InputIt>
	priority_queue(InputIt first, InputIt last) : values_(first, last), compare_() {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	const_reference top() const { return values_.front(); }
	void clear() { values_.clear(); }
	void swap(priority_queue& other) {
		values_.swap(other.values_);
		std::swap(compare_, other.compare_);
	}

	point_iterator push(const_reference value) {
		values_.push_back(value);
		std::push_heap(values_.begin(), values_.end(), compare_);
		return values_.empty() ? values_.end() : values_.begin();
	}

	void pop() {
		std::pop_heap(values_.begin(), values_.end(), compare_);
		values_.pop_back();
	}

	void modify(point_iterator position, const_reference value) {
		if (position == values_.end()) return;
		*position = value;
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	void erase(point_iterator position) {
		if (position == values_.end()) return;
		values_.erase(position);
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	void join(priority_queue& other) {
		values_.insert(values_.end(), other.values_.begin(), other.values_.end());
		other.values_.clear();
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

private:
	container_type values_;
	Cmp_Fn compare_;
};

} // namespace __gnu_pbds

#endif
`,vo=String.raw`#ifndef WASM_CLANG_EXT_ROPE
#define WASM_CLANG_EXT_ROPE

#include <algorithm>
#include <cstddef>
#include <iosfwd>
#include <iterator>
#include <memory>
#include <ostream>
#include <string>
#include <utility>

namespace __gnu_cxx {

template <typename CharT, typename Alloc = std::allocator<CharT>>
class rope {
public:
	typedef CharT value_type;
	typedef Alloc allocator_type;
	typedef std::basic_string<CharT, std::char_traits<CharT>, Alloc> string_type;
	typedef typename string_type::traits_type traits_type;
	typedef typename string_type::size_type size_type;
	typedef typename string_type::difference_type difference_type;
	typedef typename string_type::reference reference;
	typedef typename string_type::const_reference const_reference;
	typedef typename string_type::iterator iterator;
	typedef typename string_type::const_iterator const_iterator;

	static const size_type npos = string_type::npos;

	rope() = default;
	rope(const rope&) = default;
	rope(rope&&) = default;
	rope& operator=(const rope&) = default;
	rope& operator=(rope&&) = default;

	rope(const CharT* value) : data_(value ? value : empty_c_str()) {}
	rope(const CharT* value, size_type count) : data_(value, count) {}
	rope(size_type count, CharT value) : data_(count, value) {}
	rope(const string_type& value) : data_(value) {}
	rope(string_type&& value) : data_(std::move(value)) {}

	template <typename InputIt>
	rope(InputIt first, InputIt last) : data_(first, last) {}

	bool empty() const { return data_.empty(); }
	size_type size() const { return data_.size(); }
	size_type length() const { return data_.length(); }
	size_type max_size() const { return data_.max_size(); }
	void clear() { data_.clear(); }

	const CharT* c_str() const { return data_.c_str(); }
	const string_type& str() const { return data_; }

	iterator begin() { return data_.begin(); }
	const_iterator begin() const { return data_.begin(); }
	const_iterator cbegin() const { return data_.cbegin(); }
	iterator end() { return data_.end(); }
	const_iterator end() const { return data_.end(); }
	const_iterator cend() const { return data_.cend(); }

	reference operator[](size_type index) { return data_[index]; }
	const_reference operator[](size_type index) const { return data_[index]; }
	reference at(size_type index) { return data_.at(index); }
	const_reference at(size_type index) const { return data_.at(index); }
	reference mutable_reference_at(size_type index) { return data_.at(index); }

	void push_back(CharT value) { data_.push_back(value); }
	void pop_back() { data_.pop_back(); }

	rope& append(const rope& value) {
		data_.append(value.data_);
		return *this;
	}

	rope& append(const CharT* value) {
		data_.append(value ? value : empty_c_str());
		return *this;
	}

	rope& append(const CharT* value, size_type count) {
		data_.append(value, count);
		return *this;
	}

	rope& append(size_type count, CharT value) {
		data_.append(count, value);
		return *this;
	}

	rope& insert(size_type position, const rope& value) {
		data_.insert(position, value.data_);
		return *this;
	}

	rope& insert(size_type position, const CharT* value) {
		data_.insert(position, value ? value : empty_c_str());
		return *this;
	}

	rope& insert(size_type position, const CharT* value, size_type count) {
		data_.insert(position, value, count);
		return *this;
	}

	rope& insert(size_type position, size_type count, CharT value) {
		data_.insert(position, count, value);
		return *this;
	}

	rope& erase(size_type position = 0, size_type count = npos) {
		data_.erase(position, count);
		return *this;
	}

	rope& replace(size_type position, size_type count, const rope& value) {
		data_.replace(position, count, value.data_);
		return *this;
	}

	rope& replace(size_type position, size_type count, const CharT* value) {
		data_.replace(position, count, value ? value : empty_c_str());
		return *this;
	}

	rope substr(size_type position = 0, size_type count = npos) const {
		return rope(data_.substr(position, count));
	}

	size_type copy(size_type position, size_type count, CharT* target) const {
		if (position > data_.size()) return 0;
		const size_type copied = std::min(count, data_.size() - position);
		traits_type::copy(target, data_.data() + position, copied);
		return copied;
	}

	int compare(const rope& value) const { return data_.compare(value.data_); }

	rope& operator+=(const rope& value) { return append(value); }
	rope& operator+=(const CharT* value) { return append(value); }
	rope& operator+=(CharT value) {
		push_back(value);
		return *this;
	}

private:
	static const CharT* empty_c_str() {
		static const CharT empty[1] = {};
		return empty;
	}

	string_type data_;
};

template <typename CharT, typename Alloc>
rope<CharT, Alloc> operator+(rope<CharT, Alloc> left, const rope<CharT, Alloc>& right) {
	left += right;
	return left;
}

template <typename CharT, typename Alloc>
bool operator==(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return left.compare(right) == 0;
}

template <typename CharT, typename Alloc>
bool operator!=(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return !(left == right);
}

template <typename CharT, typename Alloc>
bool operator<(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return left.compare(right) < 0;
}

template <typename CharT, typename Alloc>
std::basic_ostream<CharT>& operator<<(
	std::basic_ostream<CharT>& output,
	const rope<CharT, Alloc>& value
) {
	return output << value.str();
}

typedef rope<char> crope;
typedef rope<wchar_t> wrope;

} // namespace __gnu_cxx

#endif
`,Mo=String.raw`#ifndef WASM_CLANG_SETJMP_H
#define WASM_CLANG_SETJMP_H

#ifdef __cplusplus
extern "C" {
#endif

typedef long jmp_buf[32];
int setjmp(jmp_buf);
__attribute__((noreturn)) void longjmp(jmp_buf, int);

#ifdef __cplusplus
}
#endif

#endif
`,Do=String.raw`#ifndef WASM_CLANG_BITS_STDCPP_H
#define WASM_CLANG_BITS_STDCPP_H

#include <algorithm>
#include <array>
#include <bitset>
#include <cassert>
#include <cctype>
#include <cerrno>
#include <cfloat>
#include <climits>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <deque>
#include <functional>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <limits>
#include <list>
#include <map>
#include <memory>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <string_view>
#include <tuple>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

#endif
`,Po=String.raw`#ifndef WASM_CLANG_BITS_EXTCXX_H
#define WASM_CLANG_BITS_EXTCXX_H

#include <bits/stdc++.h>
#include <ext/hash_map>
#include <ext/hash_set>
#include <ext/rope>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/hash_policy.hpp>
#include <ext/pb_ds/priority_queue.hpp>
#include <ext/pb_ds/tree_policy.hpp>

#endif
`,Oo=[{path:"include/setjmp.h",contents:Mo},{path:"include/bits/stdc++.h",contents:Do},{path:"include/bits/extc++.h",contents:Po},{path:"include/c++/v1/ext/rope",contents:vo},{path:"include/c++/v1/ext/pb_ds/tree_policy.hpp",contents:wo},{path:"include/c++/v1/ext/pb_ds/assoc_container.hpp",contents:Lo},{path:"include/c++/v1/ext/pb_ds/hash_policy.hpp",contents:Ro},{path:"include/c++/v1/ext/pb_ds/priority_queue.hpp",contents:Co}];function bi(t){t.addDirectory("include/c++/v1/ext/pb_ds"),t.addDirectory("include/bits");for(let e of Oo)t.addFile(e.path,e.contents)}var xi=Object.freeze({"builtins.h":`/*===---- builtins.h - Standard header for extra builtins -----------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

/// Some legacy compilers have builtin definitions in a file named builtins.h.
/// This header file has been added to allow compatibility with code that was
/// written for those compilers. Code may have an include line for this file
/// and to avoid an error an empty file with this name is provided.
#ifndef __BUILTINS_H
#define __BUILTINS_H

#if defined(__MVS__) && __has_include_next(<builtins.h>)
#include_next <builtins.h>
#endif /* __MVS__ */
#endif /* __BUILTINS_H */
`,"float.h":`/*===---- float.h - Characteristics of floating point types ----------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if defined(__MVS__) && __has_include_next(<float.h>)
#include <__float_header_macro.h>
#include_next <float.h>
#else

#if !defined(__need_infinity_nan)
#define __need_float_float
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#define __need_infinity_nan
#endif
#include <__float_header_macro.h>
#endif

#ifdef __need_float_float
/* If we're on MinGW, fall back to the system's float.h, which might have
 * additional definitions provided for Windows.
 * For more details see http://msdn.microsoft.com/en-us/library/y0ybw9fy.aspx
 *
 * Also fall back on AIX to allow additional definitions and
 * implementation-defined values.
 */
#if (defined(__MINGW32__) || defined(_MSC_VER) || defined(_AIX)) &&            \\
    __STDC_HOSTED__ && __has_include_next(<float.h>)

#  include_next <float.h>

#endif

#include <__float_float.h>
#undef __need_float_float
#endif

#ifdef __need_infinity_nan
#include <__float_infinity_nan.h>
#undef __need_infinity_nan
#endif

#endif /* __MVS__ */
`,"__float_float.h":`/*===---- __float_float.h --------------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_FLOAT_H
#define __CLANG_FLOAT_FLOAT_H

#if (defined(__MINGW32__) || defined(_MSC_VER) || defined(_AIX)) &&            \\
    __STDC_HOSTED__

/* Undefine anything that we'll be redefining below. */
#  undef FLT_EVAL_METHOD
#  undef FLT_ROUNDS
#  undef FLT_RADIX
#  undef FLT_MANT_DIG
#  undef DBL_MANT_DIG
#  undef LDBL_MANT_DIG
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#    undef DECIMAL_DIG
#  endif
#  undef FLT_DIG
#  undef DBL_DIG
#  undef LDBL_DIG
#  undef FLT_MIN_EXP
#  undef DBL_MIN_EXP
#  undef LDBL_MIN_EXP
#  undef FLT_MIN_10_EXP
#  undef DBL_MIN_10_EXP
#  undef LDBL_MIN_10_EXP
#  undef FLT_MAX_EXP
#  undef DBL_MAX_EXP
#  undef LDBL_MAX_EXP
#  undef FLT_MAX_10_EXP
#  undef DBL_MAX_10_EXP
#  undef LDBL_MAX_10_EXP
#  undef FLT_MAX
#  undef DBL_MAX
#  undef LDBL_MAX
#  undef FLT_EPSILON
#  undef DBL_EPSILON
#  undef LDBL_EPSILON
#  undef FLT_MIN
#  undef DBL_MIN
#  undef LDBL_MIN
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201703L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#    undef FLT_TRUE_MIN
#    undef DBL_TRUE_MIN
#    undef LDBL_TRUE_MIN
#    undef FLT_DECIMAL_DIG
#    undef DBL_DECIMAL_DIG
#    undef LDBL_DECIMAL_DIG
#    undef FLT_HAS_SUBNORM
#    undef DBL_HAS_SUBNORM
#    undef LDBL_HAS_SUBNORM
#  endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#    undef FLT_NORM_MAX
#    undef DBL_NORM_MAX
#    undef LDBL_NORM_MAX
#endif
#endif

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#  undef FLT_SNAN
#  undef DBL_SNAN
#  undef LDBL_SNAN
#endif

/* Characteristics of floating point types, C99 5.2.4.2.2 */

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)
#define FLT_EVAL_METHOD __FLT_EVAL_METHOD__
#endif
#define FLT_ROUNDS (__builtin_flt_rounds())
#define FLT_RADIX __FLT_RADIX__

#define FLT_MANT_DIG __FLT_MANT_DIG__
#define DBL_MANT_DIG __DBL_MANT_DIG__
#define LDBL_MANT_DIG __LDBL_MANT_DIG__

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#  define DECIMAL_DIG __DECIMAL_DIG__
#endif

#define FLT_DIG __FLT_DIG__
#define DBL_DIG __DBL_DIG__
#define LDBL_DIG __LDBL_DIG__

#define FLT_MIN_EXP __FLT_MIN_EXP__
#define DBL_MIN_EXP __DBL_MIN_EXP__
#define LDBL_MIN_EXP __LDBL_MIN_EXP__

#define FLT_MIN_10_EXP __FLT_MIN_10_EXP__
#define DBL_MIN_10_EXP __DBL_MIN_10_EXP__
#define LDBL_MIN_10_EXP __LDBL_MIN_10_EXP__

#define FLT_MAX_EXP __FLT_MAX_EXP__
#define DBL_MAX_EXP __DBL_MAX_EXP__
#define LDBL_MAX_EXP __LDBL_MAX_EXP__

#define FLT_MAX_10_EXP __FLT_MAX_10_EXP__
#define DBL_MAX_10_EXP __DBL_MAX_10_EXP__
#define LDBL_MAX_10_EXP __LDBL_MAX_10_EXP__

#define FLT_MAX __FLT_MAX__
#define DBL_MAX __DBL_MAX__
#define LDBL_MAX __LDBL_MAX__

#define FLT_EPSILON __FLT_EPSILON__
#define DBL_EPSILON __DBL_EPSILON__
#define LDBL_EPSILON __LDBL_EPSILON__

#define FLT_MIN __FLT_MIN__
#define DBL_MIN __DBL_MIN__
#define LDBL_MIN __LDBL_MIN__

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201703L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#  define FLT_TRUE_MIN __FLT_DENORM_MIN__
#  define DBL_TRUE_MIN __DBL_DENORM_MIN__
#  define LDBL_TRUE_MIN __LDBL_DENORM_MIN__
#  define FLT_DECIMAL_DIG __FLT_DECIMAL_DIG__
#  define DBL_DECIMAL_DIG __DBL_DECIMAL_DIG__
#  define LDBL_DECIMAL_DIG __LDBL_DECIMAL_DIG__
#  define FLT_HAS_SUBNORM __FLT_HAS_DENORM__
#  define DBL_HAS_SUBNORM __DBL_HAS_DENORM__
#  define LDBL_HAS_SUBNORM __LDBL_HAS_DENORM__
#endif

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
   /* C23 5.2.5.3.2p28 */
#  define FLT_SNAN (__builtin_nansf(""))
#  define DBL_SNAN (__builtin_nans(""))
#  define LDBL_SNAN (__builtin_nansl(""))

   /* C23 5.2.5.3.3p32 */
#  define FLT_NORM_MAX __FLT_NORM_MAX__
#  define DBL_NORM_MAX __DBL_NORM_MAX__
#  define LDBL_NORM_MAX __LDBL_NORM_MAX__
#endif

#ifdef __STDC_WANT_IEC_60559_TYPES_EXT__
#  define FLT16_MANT_DIG    __FLT16_MANT_DIG__
#  define FLT16_DECIMAL_DIG __FLT16_DECIMAL_DIG__
#  define FLT16_DIG         __FLT16_DIG__
#  define FLT16_MIN_EXP     __FLT16_MIN_EXP__
#  define FLT16_MIN_10_EXP  __FLT16_MIN_10_EXP__
#  define FLT16_MAX_EXP     __FLT16_MAX_EXP__
#  define FLT16_MAX_10_EXP  __FLT16_MAX_10_EXP__
#  define FLT16_MAX         __FLT16_MAX__
#  define FLT16_EPSILON     __FLT16_EPSILON__
#  define FLT16_MIN         __FLT16_MIN__
#  define FLT16_TRUE_MIN    __FLT16_TRUE_MIN__
#endif /* __STDC_WANT_IEC_60559_TYPES_EXT__ */

#endif /* __CLANG_FLOAT_FLOAT_H */
`,"__float_header_macro.h":`/*===---- __float_header_macro.h -------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_H
#define __CLANG_FLOAT_H
#endif /* __CLANG_FLOAT_H */
`,"__float_infinity_nan.h":`/*===---- __float_infinity_nan.h -------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_INFINITY_NAN_H
#define __CLANG_FLOAT_INFINITY_NAN_H

/* C23 5.2.5.3.3p29-30 */
#undef INFINITY
#undef NAN

#define INFINITY (__builtin_inff())
#define NAN (__builtin_nanf(""))

#endif /* __CLANG_FLOAT_INFINITY_NAN_H */
`,"inttypes.h":`/*===---- inttypes.h - Standard header for integer printf macros ----------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_INTTYPES_H
// AIX system headers need inttypes.h to be re-enterable while _STD_TYPES_T
// is defined until an inclusion of it without _STD_TYPES_T occurs, in which
// case the header guard macro is defined.
#if !defined(_AIX) || !defined(_STD_TYPES_T)
#define __CLANG_INTTYPES_H
#endif
#if defined(__MVS__) && __has_include_next(<inttypes.h>)
#include_next <inttypes.h>
#else

#if defined(_MSC_VER) && _MSC_VER < 1800
#error MSVC does not have inttypes.h prior to Visual Studio 2013
#endif

#include_next <inttypes.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
/* MSVC headers define int32_t as int, but PRIx32 as "lx" instead of "x".
 * This triggers format warnings, so fix it up here. */
#undef PRId32
#undef PRIdLEAST32
#undef PRIdFAST32
#undef PRIi32
#undef PRIiLEAST32
#undef PRIiFAST32
#undef PRIo32
#undef PRIoLEAST32
#undef PRIoFAST32
#undef PRIu32
#undef PRIuLEAST32
#undef PRIuFAST32
#undef PRIx32
#undef PRIxLEAST32
#undef PRIxFAST32
#undef PRIX32
#undef PRIXLEAST32
#undef PRIXFAST32

#undef SCNd32
#undef SCNdLEAST32
#undef SCNdFAST32
#undef SCNi32
#undef SCNiLEAST32
#undef SCNiFAST32
#undef SCNo32
#undef SCNoLEAST32
#undef SCNoFAST32
#undef SCNu32
#undef SCNuLEAST32
#undef SCNuFAST32
#undef SCNx32
#undef SCNxLEAST32
#undef SCNxFAST32

#define PRId32 "d"
#define PRIdLEAST32 "d"
#define PRIdFAST32 "d"
#define PRIi32 "i"
#define PRIiLEAST32 "i"
#define PRIiFAST32 "i"
#define PRIo32 "o"
#define PRIoLEAST32 "o"
#define PRIoFAST32 "o"
#define PRIu32 "u"
#define PRIuLEAST32 "u"
#define PRIuFAST32 "u"
#define PRIx32 "x"
#define PRIxLEAST32 "x"
#define PRIxFAST32 "x"
#define PRIX32 "X"
#define PRIXLEAST32 "X"
#define PRIXFAST32 "X"

#define SCNd32 "d"
#define SCNdLEAST32 "d"
#define SCNdFAST32 "d"
#define SCNi32 "i"
#define SCNiLEAST32 "i"
#define SCNiFAST32 "i"
#define SCNo32 "o"
#define SCNoLEAST32 "o"
#define SCNoFAST32 "o"
#define SCNu32 "u"
#define SCNuLEAST32 "u"
#define SCNuFAST32 "u"
#define SCNx32 "x"
#define SCNxLEAST32 "x"
#define SCNxFAST32 "x"
#endif

#endif /* __MVS__ */
#endif /* __CLANG_INTTYPES_H */
`,"iso646.h":`/*===---- iso646.h - Standard header for alternate spellings of operators---===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __ISO646_H
#define __ISO646_H
#if defined(__MVS__) && __has_include_next(<iso646.h>)
#include_next <iso646.h>
#else

#ifndef __cplusplus
#define and    &&
#define and_eq &=
#define bitand &
#define bitor  |
#define compl  ~
#define not    !
#define not_eq !=
#define or     ||
#define or_eq  |=
#define xor    ^
#define xor_eq ^=
#endif

#endif /* __MVS__ */
#endif /* __ISO646_H */
`,"limits.h":`/*===---- limits.h - Standard header for integer sizes --------------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_LIMITS_H
#define __CLANG_LIMITS_H

#if defined(__MVS__) && __has_include_next(<limits.h>)
#include_next <limits.h>
#else

/* The system's limits.h may, in turn, try to #include_next GCC's limits.h.
   Avert this #include_next madness. */
#if defined __GNUC__ && !defined _GCC_LIMITS_H_
#define _GCC_LIMITS_H_
#endif

/* System headers include a number of constants from POSIX in <limits.h>.
   Include it if we're hosted. */
#if __STDC_HOSTED__ && __has_include_next(<limits.h>)
#include_next <limits.h>
#endif

/* Many system headers try to "help us out" by defining these.  No really, we
   know how big each datatype is. */
#undef  SCHAR_MIN
#undef  SCHAR_MAX
#undef  UCHAR_MAX
#undef  SHRT_MIN
#undef  SHRT_MAX
#undef  USHRT_MAX
#undef  INT_MIN
#undef  INT_MAX
#undef  UINT_MAX
#undef  LONG_MIN
#undef  LONG_MAX
#undef  ULONG_MAX

#undef  CHAR_BIT
#undef  CHAR_MIN
#undef  CHAR_MAX

/* C90/99 5.2.4.2.1 */
#define SCHAR_MAX __SCHAR_MAX__
#define SHRT_MAX  __SHRT_MAX__
#define INT_MAX   __INT_MAX__
#define LONG_MAX  __LONG_MAX__

#define SCHAR_MIN (-__SCHAR_MAX__-1)
#define SHRT_MIN  (-__SHRT_MAX__ -1)
#define INT_MIN   (-__INT_MAX__  -1)
#define LONG_MIN  (-__LONG_MAX__ -1L)

#define UCHAR_MAX (__SCHAR_MAX__*2  +1)
#if __SHRT_WIDTH__ < __INT_WIDTH__
#define USHRT_MAX (__SHRT_MAX__ * 2 + 1)
#else
#define USHRT_MAX (__SHRT_MAX__ * 2U + 1U)
#endif
#define UINT_MAX  (__INT_MAX__  *2U +1U)
#define ULONG_MAX (__LONG_MAX__ *2UL+1UL)

#ifndef MB_LEN_MAX
#define MB_LEN_MAX 1
#endif

#define CHAR_BIT  __CHAR_BIT__

/* C23 5.2.4.2.1 */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define BOOL_WIDTH   __BOOL_WIDTH__
#define CHAR_WIDTH   CHAR_BIT
#define SCHAR_WIDTH  CHAR_BIT
#define UCHAR_WIDTH  CHAR_BIT
#define USHRT_WIDTH  __SHRT_WIDTH__
#define SHRT_WIDTH   __SHRT_WIDTH__
#define UINT_WIDTH   __INT_WIDTH__
#define INT_WIDTH    __INT_WIDTH__
#define ULONG_WIDTH  __LONG_WIDTH__
#define LONG_WIDTH   __LONG_WIDTH__
#define ULLONG_WIDTH __LLONG_WIDTH__
#define LLONG_WIDTH  __LLONG_WIDTH__

#define BITINT_MAXWIDTH __BITINT_MAXWIDTH__
#endif

#ifdef __CHAR_UNSIGNED__  /* -funsigned-char */
#define CHAR_MIN 0
#define CHAR_MAX UCHAR_MAX
#else
#define CHAR_MIN SCHAR_MIN
#define CHAR_MAX __SCHAR_MAX__
#endif

/* C99 5.2.4.2.1: Added long long.
   C++11 18.3.3.2: same contents as the Standard C Library header <limits.h>.
 */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)

#undef  LLONG_MIN
#undef  LLONG_MAX
#undef  ULLONG_MAX

#define LLONG_MAX  __LONG_LONG_MAX__
#define LLONG_MIN  (-__LONG_LONG_MAX__-1LL)
#define ULLONG_MAX (__LONG_LONG_MAX__*2ULL+1ULL)
#endif

/* LONG_LONG_MIN/LONG_LONG_MAX/ULONG_LONG_MAX are a GNU extension. Android's
   bionic also defines them. It's too bad that we don't have something like
   #pragma poison that could be used to deprecate a macro - the code should just
   use LLONG_MAX and friends.
 */
#if (defined(__GNU_LIBRARY__) ? defined(__USE_GNU)                             \\
                              : !defined(__STRICT_ANSI__)) ||                  \\
    defined(__BIONIC__)

#undef   LONG_LONG_MIN
#undef   LONG_LONG_MAX
#undef   ULONG_LONG_MAX

#define LONG_LONG_MAX  __LONG_LONG_MAX__
#define LONG_LONG_MIN  (-__LONG_LONG_MAX__-1LL)
#define ULONG_LONG_MAX (__LONG_LONG_MAX__*2ULL+1ULL)
#endif

#endif /* __MVS__ */
#endif /* __CLANG_LIMITS_H */
`,"stdalign.h":`/*===---- stdalign.h - Standard header for alignment ------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDALIGN_H
#define __STDALIGN_H

#if defined(__cplusplus) ||                                                    \\
    (defined(__STDC_VERSION__) && __STDC_VERSION__ < 202311L)
#ifndef __cplusplus
#define alignas _Alignas
#define alignof _Alignof
#endif

#define __alignas_is_defined 1
#define __alignof_is_defined 1
#endif /* __STDC_VERSION__ */

#endif /* __STDALIGN_H */
`,"stdarg.h":`/*===---- stdarg.h - Variable argument handling ----------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * This header is designed to be included multiple times. If any of the __need_
 * macros are defined, then only that subset of interfaces are provided. This
 * can be useful for POSIX headers that need to not expose all of stdarg.h, but
 * need to use some of its interfaces. Otherwise this header provides all of
 * the expected interfaces.
 *
 * When clang modules are enabled, this header is a textual header to support
 * the multiple include behavior. As such, it doesn't directly declare anything
 * so that it doesn't add duplicate declarations to all of its includers'
 * modules.
 */
#if defined(__MVS__) && __has_include_next(<stdarg.h>)
#undef __need___va_list
#undef __need_va_list
#undef __need_va_arg
#undef __need___va_copy
#undef __need_va_copy
#include <__stdarg_header_macro.h>
#include_next <stdarg.h>

#else
#if !defined(__need___va_list) && !defined(__need_va_list) &&                  \\
    !defined(__need_va_arg) && !defined(__need___va_copy) &&                   \\
    !defined(__need_va_copy)
#define __need___va_list
#define __need_va_list
#define __need_va_arg
#define __need___va_copy
/* GCC always defines __va_copy, but does not define va_copy unless in c99 mode
 * or -ansi is not specified, since it was not part of C90.
 */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    !defined(__STRICT_ANSI__)
#define __need_va_copy
#endif
#include <__stdarg_header_macro.h>
#endif

#ifdef __need___va_list
#include <__stdarg___gnuc_va_list.h>
#undef __need___va_list
#endif /* defined(__need___va_list) */

#ifdef __need_va_list
#include <__stdarg_va_list.h>
#undef __need_va_list
#endif /* defined(__need_va_list) */

#ifdef __need_va_arg
#include <__stdarg_va_arg.h>
#undef __need_va_arg
#endif /* defined(__need_va_arg) */

#ifdef __need___va_copy
#include <__stdarg___va_copy.h>
#undef __need___va_copy
#endif /* defined(__need___va_copy) */

#ifdef __need_va_copy
#include <__stdarg_va_copy.h>
#undef __need_va_copy
#endif /* defined(__need_va_copy) */

#endif /* __MVS__ */
`,"__stdarg___gnuc_va_list.h":`/*===---- __stdarg___gnuc_va_list.h - Definition of __gnuc_va_list ---------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __GNUC_VA_LIST
#define __GNUC_VA_LIST
typedef __builtin_va_list __gnuc_va_list;
#endif
`,"__stdarg___va_copy.h":`/*===---- __stdarg___va_copy.h - Definition of __va_copy -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __va_copy
#define __va_copy(d, s) __builtin_va_copy(d, s)
#endif
`,"__stdarg_header_macro.h":`/*===---- __stdarg_header_macro.h ------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDARG_H
#define __STDARG_H
#endif
`,"__stdarg_va_arg.h":`/*===---- __stdarg_va_arg.h - Definitions of va_start, va_arg, va_end-------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef va_arg

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* C23 uses a special builtin. */
#define va_start(...) __builtin_c23_va_start(__VA_ARGS__)
#else
/* Versions before C23 do require the second parameter. */
#define va_start(ap, param) __builtin_va_start(ap, param)
#endif
#define va_end(ap) __builtin_va_end(ap)
#define va_arg(ap, type) __builtin_va_arg(ap, type)

#endif
`,"__stdarg_va_copy.h":`/*===---- __stdarg_va_copy.h - Definition of va_copy------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef va_copy
#define va_copy(dest, src) __builtin_va_copy(dest, src)
#endif
`,"__stdarg_va_list.h":`/*===---- __stdarg_va_list.h - Definition of va_list -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef _VA_LIST
#define _VA_LIST
typedef __builtin_va_list va_list;
#endif
`,"stdatomic.h":`/*===---- stdatomic.h - Standard header for atomic types and operations -----===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_STDATOMIC_H
#define __CLANG_STDATOMIC_H

/* If we're hosted, fall back to the system's stdatomic.h. FreeBSD, for
 * example, already has a Clang-compatible stdatomic.h header.
 *
 * Exclude the MSVC path as well as the MSVC header as of the 14.31.30818
 * explicitly disallows \`stdatomic.h\` in the C mode via an \`#error\`.  Fallback
 * to the clang resource header until that is fully supported.  The
 * \`stdatomic.h\` header requires C++23 or newer.
 */
#if __STDC_HOSTED__ &&                                                         \\
    __has_include_next(<stdatomic.h>) &&                                       \\
    (!defined(_MSC_VER) || (defined(__cplusplus) && __cplusplus >= 202002L))
# include_next <stdatomic.h>
#else

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/* 7.17.1 Introduction */

#define ATOMIC_BOOL_LOCK_FREE       __CLANG_ATOMIC_BOOL_LOCK_FREE
#define ATOMIC_CHAR_LOCK_FREE       __CLANG_ATOMIC_CHAR_LOCK_FREE
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define ATOMIC_CHAR8_T_LOCK_FREE    __CLANG_ATOMIC_CHAR8_T_LOCK_FREE
#endif
#define ATOMIC_CHAR16_T_LOCK_FREE   __CLANG_ATOMIC_CHAR16_T_LOCK_FREE
#define ATOMIC_CHAR32_T_LOCK_FREE   __CLANG_ATOMIC_CHAR32_T_LOCK_FREE
#define ATOMIC_WCHAR_T_LOCK_FREE    __CLANG_ATOMIC_WCHAR_T_LOCK_FREE
#define ATOMIC_SHORT_LOCK_FREE      __CLANG_ATOMIC_SHORT_LOCK_FREE
#define ATOMIC_INT_LOCK_FREE        __CLANG_ATOMIC_INT_LOCK_FREE
#define ATOMIC_LONG_LOCK_FREE       __CLANG_ATOMIC_LONG_LOCK_FREE
#define ATOMIC_LLONG_LOCK_FREE      __CLANG_ATOMIC_LLONG_LOCK_FREE
#define ATOMIC_POINTER_LOCK_FREE    __CLANG_ATOMIC_POINTER_LOCK_FREE

/* 7.17.2 Initialization */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ < 202311L) ||               \\
    defined(__cplusplus)
/* ATOMIC_VAR_INIT was removed in C23, but still remains in C++23. */
#define ATOMIC_VAR_INIT(value) (value)
#endif

#if ((defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201710L &&              \\
      __STDC_VERSION__ < 202311L) ||                                           \\
     (defined(__cplusplus) && __cplusplus >= 202002L)) &&                      \\
    !defined(_CLANG_DISABLE_CRT_DEPRECATION_WARNINGS)
/* ATOMIC_VAR_INIT was deprecated in C17 and C++20. */
#pragma clang deprecated(ATOMIC_VAR_INIT)
#endif
#define atomic_init __c11_atomic_init

/* 7.17.3 Order and consistency */

typedef enum memory_order {
  memory_order_relaxed = __ATOMIC_RELAXED,
  memory_order_consume = __ATOMIC_CONSUME,
  memory_order_acquire = __ATOMIC_ACQUIRE,
  memory_order_release = __ATOMIC_RELEASE,
  memory_order_acq_rel = __ATOMIC_ACQ_REL,
  memory_order_seq_cst = __ATOMIC_SEQ_CST
} memory_order;

#define kill_dependency(y) (y)

/* 7.17.4 Fences */

/* These should be provided by the libc implementation. */
void atomic_thread_fence(memory_order);
void atomic_signal_fence(memory_order);

#define atomic_thread_fence(order) __c11_atomic_thread_fence(order)
#define atomic_signal_fence(order) __c11_atomic_signal_fence(order)

/* 7.17.5 Lock-free property */

#define atomic_is_lock_free(obj) __c11_atomic_is_lock_free(sizeof(*(obj)))

/* 7.17.6 Atomic integer types */

#ifdef __cplusplus
typedef _Atomic(bool)               atomic_bool;
#else
typedef _Atomic(_Bool)              atomic_bool;
#endif
typedef _Atomic(char)               atomic_char;
typedef _Atomic(signed char)        atomic_schar;
typedef _Atomic(unsigned char)      atomic_uchar;
typedef _Atomic(short)              atomic_short;
typedef _Atomic(unsigned short)     atomic_ushort;
typedef _Atomic(int)                atomic_int;
typedef _Atomic(unsigned int)       atomic_uint;
typedef _Atomic(long)               atomic_long;
typedef _Atomic(unsigned long)      atomic_ulong;
typedef _Atomic(long long)          atomic_llong;
typedef _Atomic(unsigned long long) atomic_ullong;
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
typedef _Atomic(unsigned char)      atomic_char8_t;
#endif
typedef _Atomic(uint_least16_t)     atomic_char16_t;
typedef _Atomic(uint_least32_t)     atomic_char32_t;
typedef _Atomic(wchar_t)            atomic_wchar_t;
typedef _Atomic(int_least8_t)       atomic_int_least8_t;
typedef _Atomic(uint_least8_t)      atomic_uint_least8_t;
typedef _Atomic(int_least16_t)      atomic_int_least16_t;
typedef _Atomic(uint_least16_t)     atomic_uint_least16_t;
typedef _Atomic(int_least32_t)      atomic_int_least32_t;
typedef _Atomic(uint_least32_t)     atomic_uint_least32_t;
typedef _Atomic(int_least64_t)      atomic_int_least64_t;
typedef _Atomic(uint_least64_t)     atomic_uint_least64_t;
typedef _Atomic(int_fast8_t)        atomic_int_fast8_t;
typedef _Atomic(uint_fast8_t)       atomic_uint_fast8_t;
typedef _Atomic(int_fast16_t)       atomic_int_fast16_t;
typedef _Atomic(uint_fast16_t)      atomic_uint_fast16_t;
typedef _Atomic(int_fast32_t)       atomic_int_fast32_t;
typedef _Atomic(uint_fast32_t)      atomic_uint_fast32_t;
typedef _Atomic(int_fast64_t)       atomic_int_fast64_t;
typedef _Atomic(uint_fast64_t)      atomic_uint_fast64_t;
typedef _Atomic(intptr_t)           atomic_intptr_t;
typedef _Atomic(uintptr_t)          atomic_uintptr_t;
typedef _Atomic(size_t)             atomic_size_t;
typedef _Atomic(ptrdiff_t)          atomic_ptrdiff_t;
typedef _Atomic(intmax_t)           atomic_intmax_t;
typedef _Atomic(uintmax_t)          atomic_uintmax_t;

/* 7.17.7 Operations on atomic types */

#define atomic_store(object, desired) __c11_atomic_store(object, desired, __ATOMIC_SEQ_CST)
#define atomic_store_explicit __c11_atomic_store

#define atomic_load(object) __c11_atomic_load(object, __ATOMIC_SEQ_CST)
#define atomic_load_explicit __c11_atomic_load

#define atomic_exchange(object, desired) __c11_atomic_exchange(object, desired, __ATOMIC_SEQ_CST)
#define atomic_exchange_explicit __c11_atomic_exchange

#define atomic_compare_exchange_strong(object, expected, desired) __c11_atomic_compare_exchange_strong(object, expected, desired, __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST)
#define atomic_compare_exchange_strong_explicit __c11_atomic_compare_exchange_strong

#define atomic_compare_exchange_weak(object, expected, desired) __c11_atomic_compare_exchange_weak(object, expected, desired, __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST)
#define atomic_compare_exchange_weak_explicit __c11_atomic_compare_exchange_weak

#define atomic_fetch_add(object, operand) __c11_atomic_fetch_add(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_add_explicit __c11_atomic_fetch_add

#define atomic_fetch_sub(object, operand) __c11_atomic_fetch_sub(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_sub_explicit __c11_atomic_fetch_sub

#define atomic_fetch_or(object, operand) __c11_atomic_fetch_or(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_or_explicit __c11_atomic_fetch_or

#define atomic_fetch_xor(object, operand) __c11_atomic_fetch_xor(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_xor_explicit __c11_atomic_fetch_xor

#define atomic_fetch_and(object, operand) __c11_atomic_fetch_and(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_and_explicit __c11_atomic_fetch_and

/* 7.17.8 Atomic flag type and operations */

typedef struct atomic_flag { atomic_bool _Value; } atomic_flag;

#ifdef __cplusplus
#define ATOMIC_FLAG_INIT {false}
#else
#define ATOMIC_FLAG_INIT { 0 }
#endif

/* These should be provided by the libc implementation. */
#ifdef __cplusplus
bool atomic_flag_test_and_set(volatile atomic_flag *);
bool atomic_flag_test_and_set_explicit(volatile atomic_flag *, memory_order);
#else
_Bool atomic_flag_test_and_set(volatile atomic_flag *);
_Bool atomic_flag_test_and_set_explicit(volatile atomic_flag *, memory_order);
#endif
void atomic_flag_clear(volatile atomic_flag *);
void atomic_flag_clear_explicit(volatile atomic_flag *, memory_order);

#define atomic_flag_test_and_set(object) __c11_atomic_exchange(&(object)->_Value, 1, __ATOMIC_SEQ_CST)
#define atomic_flag_test_and_set_explicit(object, order) __c11_atomic_exchange(&(object)->_Value, 1, order)

#define atomic_flag_clear(object) __c11_atomic_store(&(object)->_Value, 0, __ATOMIC_SEQ_CST)
#define atomic_flag_clear_explicit(object, order) __c11_atomic_store(&(object)->_Value, 0, order)

#ifdef __cplusplus
}
#endif

#endif /* __STDC_HOSTED__ */
#endif /* __CLANG_STDATOMIC_H */

`,"stdbool.h":`/*===---- stdbool.h - Standard header for booleans -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDBOOL_H
#define __STDBOOL_H

#define __bool_true_false_are_defined 1

#if defined(__MVS__) && __has_include_next(<stdbool.h>)
#include_next <stdbool.h>
#else

#if defined(__STDC_VERSION__) && __STDC_VERSION__ > 201710L
/* FIXME: We should be issuing a deprecation warning here, but cannot yet due
 * to system headers which include this header file unconditionally.
 */
#elif !defined(__cplusplus)
#define bool _Bool
#define true 1
#define false 0
#elif defined(__GNUC__) && !defined(__STRICT_ANSI__)
/* Define _Bool as a GNU extension. */
#define _Bool bool
#if defined(__cplusplus) && __cplusplus < 201103L
/* For C++98, define bool, false, true as a GNU extension. */
#define bool bool
#define false false
#define true true
#endif
#endif

#endif /* __MVS__ */
#endif /* __STDBOOL_H */
`,"stdcountof.h":`/*===---- stdcountof.h - Standard header for countof -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDCOUNTOF_H
#define __STDCOUNTOF_H

#define countof _Countof

#endif /* __STDCOUNTOF_H */
`,"stdckdint.h":`/*===---- stdckdint.h - Standard header for checking integer----------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDCKDINT_H
#define __STDCKDINT_H

/* If we're hosted, fall back to the system's stdckdint.h. FreeBSD, for
 * example, already has a Clang-compatible stdckdint.h header.
 *
 * The \`stdckdint.h\` header requires C 23 or newer.
 */
#if __STDC_HOSTED__ && __has_include_next(<stdckdint.h>)
#include_next <stdckdint.h>
#else

/* C23 7.20.1 Defines several macros for performing checked integer arithmetic*/

#define __STDC_VERSION_STDCKDINT_H__ 202311L

// Both A and B shall be any integer type other than "plain" char, bool, a bit-
// precise integer type, or an enumerated type, and they need not be the same.

// R shall be a modifiable lvalue of any integer type other than "plain" char,
// bool, a bit-precise integer type, or an enumerated type. It shouldn't be
// short type, either. Otherwise, it may be unable to hold two the result of
// operating two 'int's.

// A diagnostic message will be produced if A or B are not suitable integer
// types, or if R is not a modifiable lvalue of a suitable integer type or R
// is short type.
#define ckd_add(R, A, B) __builtin_add_overflow((A), (B), (R))
#define ckd_sub(R, A, B) __builtin_sub_overflow((A), (B), (R))
#define ckd_mul(R, A, B) __builtin_mul_overflow((A), (B), (R))

#endif /* __STDC_HOSTED__ */
#endif /* __STDCKDINT_H */
`,"stddef.h":`/*===---- stddef.h - Basic type definitions --------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * This header is designed to be included multiple times. If any of the __need_
 * macros are defined, then only that subset of interfaces are provided. This
 * can be useful for POSIX headers that need to not expose all of stddef.h, but
 * need to use some of its interfaces. Otherwise this header provides all of
 * the expected interfaces.
 *
 * When clang modules are enabled, this header is a textual header to support
 * the multiple include behavior. As such, it doesn't directly declare anything
 * so that it doesn't add duplicate declarations to all of its includers'
 * modules.
 */
#if defined(__MVS__) && __has_include_next(<stddef.h>)
#undef __need_ptrdiff_t
#undef __need_size_t
#undef __need_rsize_t
#undef __need_wchar_t
#undef __need_NULL
#undef __need_nullptr_t
#undef __need_unreachable
#undef __need_max_align_t
#undef __need_offsetof
#undef __need_wint_t
#include <__stddef_header_macro.h>
#include_next <stddef.h>

#else

#if !defined(__need_ptrdiff_t) && !defined(__need_size_t) &&                   \\
    !defined(__need_rsize_t) && !defined(__need_wchar_t) &&                    \\
    !defined(__need_NULL) && !defined(__need_nullptr_t) &&                     \\
    !defined(__need_unreachable) && !defined(__need_max_align_t) &&            \\
    !defined(__need_offsetof) && !defined(__need_wint_t)
#define __need_ptrdiff_t
#define __need_size_t
/* ISO9899:2011 7.20 (C11 Annex K): Define rsize_t if __STDC_WANT_LIB_EXT1__ is
 * enabled. */
#if defined(__STDC_WANT_LIB_EXT1__) && __STDC_WANT_LIB_EXT1__ >= 1
#define __need_rsize_t
#endif
#define __need_wchar_t
#if !defined(__STDDEF_H) || __has_feature(modules)
/*
 * __stddef_null.h is special when building without modules: if __need_NULL is
 * set, then it will unconditionally redefine NULL. To avoid stepping on client
 * definitions of NULL, __need_NULL should only be set the first time this
 * header is included, that is when __STDDEF_H is not defined. However, when
 * building with modules, this header is a textual header and needs to
 * unconditionally include __stdef_null.h to support multiple submodules
 * exporting _Builtin_stddef.null. Take module SM with submodules A and B, whose
 * headers both include stddef.h When SM.A builds, __STDDEF_H will be defined.
 * When SM.B builds, the definition from SM.A will leak when building without
 * local submodule visibility. stddef.h wouldn't include __stddef_null.h, and
 * SM.B wouldn't import _Builtin_stddef.null, and SM.B's \`export *\` wouldn't
 * export NULL as expected. When building with modules, always include
 * __stddef_null.h so that everything works as expected.
 */
#define __need_NULL
#endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    defined(__cplusplus)
#define __need_nullptr_t
#endif
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define __need_unreachable
#endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)
#define __need_max_align_t
#endif
#define __need_offsetof
/* wint_t is provided by <wchar.h> and not <stddef.h>. It's here
 * for compatibility, but must be explicitly requested. Therefore
 * __need_wint_t is intentionally not defined here. */
#include <__stddef_header_macro.h>
#endif

#if defined(__need_ptrdiff_t)
#include <__stddef_ptrdiff_t.h>
#undef __need_ptrdiff_t
#endif /* defined(__need_ptrdiff_t) */

#if defined(__need_size_t)
#include <__stddef_size_t.h>
#undef __need_size_t
#endif /*defined(__need_size_t) */

#if defined(__need_rsize_t)
#include <__stddef_rsize_t.h>
#undef __need_rsize_t
#endif /* defined(__need_rsize_t) */

#if defined(__need_wchar_t)
#include <__stddef_wchar_t.h>
#undef __need_wchar_t
#endif /* defined(__need_wchar_t) */

#if defined(__need_NULL)
#include <__stddef_null.h>
#undef __need_NULL
#endif /* defined(__need_NULL) */

#if defined(__need_nullptr_t)
#include <__stddef_nullptr_t.h>
#undef __need_nullptr_t
#endif /* defined(__need_nullptr_t) */

#if defined(__need_unreachable)
#include <__stddef_unreachable.h>
#undef __need_unreachable
#endif /* defined(__need_unreachable) */

#if defined(__need_max_align_t)
#include <__stddef_max_align_t.h>
#undef __need_max_align_t
#endif /* defined(__need_max_align_t) */

#if defined(__need_offsetof)
#include <__stddef_offsetof.h>
#undef __need_offsetof
#endif /* defined(__need_offsetof) */

/* Some C libraries expect to see a wint_t here. Others (notably MinGW) will use
__WINT_TYPE__ directly; accommodate both by requiring __need_wint_t */
#if defined(__need_wint_t)
#include <__stddef_wint_t.h>
#undef __need_wint_t
#endif /* __need_wint_t */

#endif /* __MVS__ */
`,"stddefer.h":`/*===---- stddefer.h - Standard header for 'defer' -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_STDDEFER_H
#define __CLANG_STDDEFER_H

/* Provide 'defer' if '_Defer' is supported. */
#ifdef __STDC_DEFER_TS25755__
#define __STDC_VERSION_STDDEFER_H__ 202602L
#define defer _Defer
#endif

#endif /* __CLANG_STDDEFER_H */
`,"__stddef_header_macro.h":`/*===---- __stddef_header_macro.h ------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDDEF_H
#define __STDDEF_H
#endif
`,"__stddef_max_align_t.h":`/*===---- __stddef_max_align_t.h - Definition of max_align_t ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_MAX_ALIGN_T_DEFINED
#define __CLANG_MAX_ALIGN_T_DEFINED

#if defined(_MSC_VER)
typedef double max_align_t;
#elif defined(__APPLE__)
typedef long double max_align_t;
#else
// Define 'max_align_t' to match the GCC definition.
typedef struct {
  long long __clang_max_align_nonce1
      __attribute__((__aligned__(__alignof__(long long))));
  long double __clang_max_align_nonce2
      __attribute__((__aligned__(__alignof__(long double))));
} max_align_t;
#endif

#endif
`,"__stddef_null.h":`/*===---- __stddef_null.h - Definition of NULL -----------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if !defined(NULL) || !__building_module(_Builtin_stddef)

/* linux/stddef.h will define NULL to 0. glibc (and other) headers then define
 * __need_NULL and rely on stddef.h to redefine NULL to the correct value again.
 * Modules don't support redefining macros like that, but support that pattern
 * in the non-modules case.
 */
#undef NULL

#ifdef __cplusplus
#if !defined(__MINGW32__) && !defined(_MSC_VER)
#define NULL __null
#else
#define NULL 0
#endif
#else
#define NULL ((void*)0)
#endif

#endif
`,"__stddef_nullptr_t.h":`/*===---- __stddef_nullptr_t.h - Definition of nullptr_t -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_NULLPTR_T) ||                                                    \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _NULLPTR_T

#ifdef __cplusplus
#if defined(_MSC_EXTENSIONS) && defined(_NATIVE_NULLPTR_SUPPORTED)
namespace std {
typedef decltype(nullptr) nullptr_t;
}
using ::std::nullptr_t;
#endif
#elif defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
typedef typeof(nullptr) nullptr_t;
#endif

#endif
`,"__stddef_offsetof.h":`/*===---- __stddef_offsetof.h - Definition of offsetof ---------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(offsetof) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define offsetof(t, d) __builtin_offsetof(t, d)
#endif
`,"__stddef_ptrdiff_t.h":`/*===---- __stddef_ptrdiff_t.h - Definition of ptrdiff_t -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_PTRDIFF_T) ||                                                    \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _PTRDIFF_T

typedef __PTRDIFF_TYPE__ ptrdiff_t;

#endif
`,"__stddef_rsize_t.h":`/*===---- __stddef_rsize_t.h - Definition of rsize_t -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_RSIZE_T) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _RSIZE_T

typedef __SIZE_TYPE__ rsize_t;

#endif
`,"__stddef_size_t.h":`/*===---- __stddef_size_t.h - Definition of size_t -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_SIZE_T) ||                                                       \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _SIZE_T

typedef __SIZE_TYPE__ size_t;

#endif
`,"__stddef_unreachable.h":`/*===---- __stddef_unreachable.h - Definition of unreachable ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __cplusplus

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(unreachable) ||                                                   \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define unreachable() __builtin_unreachable()
#endif

#endif
`,"__stddef_wchar_t.h":`/*===---- __stddef_wchar.h - Definition of wchar_t -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if !defined(__cplusplus) || (defined(_MSC_VER) && !_NATIVE_WCHAR_T_DEFINED)

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_WCHAR_T) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _WCHAR_T

#ifdef _MSC_EXTENSIONS
#define _WCHAR_T_DEFINED
#endif

typedef __WCHAR_TYPE__ wchar_t;

#endif

#endif
`,"__stddef_wint_t.h":`/*===---- __stddef_wint.h - Definition of wint_t ---------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef _WINT_T
#define _WINT_T

typedef __WINT_TYPE__ wint_t;

#endif
`,"stdint.h":`/*===---- stdint.h - Standard header for sized integer types --------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_STDINT_H
// AIX system headers need stdint.h to be re-enterable while _STD_TYPES_T
// is defined until an inclusion of it without _STD_TYPES_T occurs, in which
// case the header guard macro is defined.
#if !defined(_AIX) || !defined(_STD_TYPES_T) || !defined(__STDC_HOSTED__)
#define __CLANG_STDINT_H
#endif

#if defined(__MVS__) && __has_include_next(<stdint.h>)
#include_next <stdint.h>
#else

/* If we're hosted, fall back to the system's stdint.h, which might have
 * additional definitions.
 */
#if __STDC_HOSTED__ && __has_include_next(<stdint.h>)

// C99 7.18.3 Limits of other integer types
//
//  Footnote 219, 220: C++ implementations should define these macros only when
//  __STDC_LIMIT_MACROS is defined before <stdint.h> is included.
//
//  Footnote 222: C++ implementations should define these macros only when
//  __STDC_CONSTANT_MACROS is defined before <stdint.h> is included.
//
// C++11 [cstdint.syn]p2:
//
//  The macros defined by <cstdint> are provided unconditionally. In particular,
//  the symbols __STDC_LIMIT_MACROS and __STDC_CONSTANT_MACROS (mentioned in
//  footnotes 219, 220, and 222 in the C standard) play no role in C++.
//
// C11 removed the problematic footnotes.
//
// Work around this inconsistency by always defining those macros in C++ mode,
// so that a C library implementation which follows the C99 standard can be
// used in C++.
# ifdef __cplusplus
#  if !defined(__STDC_LIMIT_MACROS)
#   define __STDC_LIMIT_MACROS
#   define __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
#  endif
#  if !defined(__STDC_CONSTANT_MACROS)
#   define __STDC_CONSTANT_MACROS
#   define __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
#  endif
# endif

# include_next <stdint.h>

# ifdef __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
#  undef __STDC_LIMIT_MACROS
#  undef __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
# endif
# ifdef __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
#  undef __STDC_CONSTANT_MACROS
#  undef __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
# endif

#else

/* C99 7.18.1.1 Exact-width integer types.
 * C99 7.18.1.2 Minimum-width integer types.
 * C99 7.18.1.3 Fastest minimum-width integer types.
 *
 * The standard requires that exact-width type be defined for 8-, 16-, 32-, and
 * 64-bit types if they are implemented. Other exact width types are optional.
 * This implementation defines an exact-width types for every integer width
 * that is represented in the standard integer types.
 *
 * The standard also requires minimum-width types be defined for 8-, 16-, 32-,
 * and 64-bit widths regardless of whether there are corresponding exact-width
 * types.
 *
 * To accommodate targets that are missing types that are exactly 8, 16, 32, or
 * 64 bits wide, this implementation takes an approach of cascading
 * redefinitions, redefining __int_leastN_t to successively smaller exact-width
 * types. It is therefore important that the types are defined in order of
 * descending widths.
 *
 * We currently assume that the minimum-width types and the fastest
 * minimum-width types are the same. This is allowed by the standard, but is
 * suboptimal.
 *
 * In violation of the standard, some targets do not implement a type that is
 * wide enough to represent all of the required widths (8-, 16-, 32-, 64-bit).
 * To accommodate these targets, a required minimum-width type is only
 * defined if there exists an exact-width type of equal or greater width.
 */

#ifdef __INT64_TYPE__
# ifndef __int8_t_defined /* glibc sys/types.h also defines int64_t*/
typedef __INT64_TYPE__ int64_t;
# endif /* __int8_t_defined */
typedef __UINT64_TYPE__ uint64_t;
# undef __int_least64_t
# define __int_least64_t int64_t
# undef __uint_least64_t
# define __uint_least64_t uint64_t
# undef __int_least32_t
# define __int_least32_t int64_t
# undef __uint_least32_t
# define __uint_least32_t uint64_t
# undef __int_least16_t
# define __int_least16_t int64_t
# undef __uint_least16_t
# define __uint_least16_t uint64_t
# undef __int_least8_t
# define __int_least8_t int64_t
# undef __uint_least8_t
# define __uint_least8_t uint64_t
#endif /* __INT64_TYPE__ */

#ifdef __int_least64_t
typedef __int_least64_t int_least64_t;
typedef __uint_least64_t uint_least64_t;
typedef __int_least64_t int_fast64_t;
typedef __uint_least64_t uint_fast64_t;
#endif /* __int_least64_t */

#ifdef __INT56_TYPE__
typedef __INT56_TYPE__ int56_t;
typedef __UINT56_TYPE__ uint56_t;
typedef int56_t int_least56_t;
typedef uint56_t uint_least56_t;
typedef int56_t int_fast56_t;
typedef uint56_t uint_fast56_t;
# undef __int_least32_t
# define __int_least32_t int56_t
# undef __uint_least32_t
# define __uint_least32_t uint56_t
# undef __int_least16_t
# define __int_least16_t int56_t
# undef __uint_least16_t
# define __uint_least16_t uint56_t
# undef __int_least8_t
# define __int_least8_t int56_t
# undef __uint_least8_t
# define __uint_least8_t uint56_t
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
typedef __INT48_TYPE__ int48_t;
typedef __UINT48_TYPE__ uint48_t;
typedef int48_t int_least48_t;
typedef uint48_t uint_least48_t;
typedef int48_t int_fast48_t;
typedef uint48_t uint_fast48_t;
# undef __int_least32_t
# define __int_least32_t int48_t
# undef __uint_least32_t
# define __uint_least32_t uint48_t
# undef __int_least16_t
# define __int_least16_t int48_t
# undef __uint_least16_t
# define __uint_least16_t uint48_t
# undef __int_least8_t
# define __int_least8_t int48_t
# undef __uint_least8_t
# define __uint_least8_t uint48_t
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
typedef __INT40_TYPE__ int40_t;
typedef __UINT40_TYPE__ uint40_t;
typedef int40_t int_least40_t;
typedef uint40_t uint_least40_t;
typedef int40_t int_fast40_t;
typedef uint40_t uint_fast40_t;
# undef __int_least32_t
# define __int_least32_t int40_t
# undef __uint_least32_t
# define __uint_least32_t uint40_t
# undef __int_least16_t
# define __int_least16_t int40_t
# undef __uint_least16_t
# define __uint_least16_t uint40_t
# undef __int_least8_t
# define __int_least8_t int40_t
# undef __uint_least8_t
# define __uint_least8_t uint40_t
#endif /* __INT40_TYPE__ */


#ifdef __INT32_TYPE__

# ifndef __int8_t_defined /* glibc sys/types.h also defines int32_t*/
typedef __INT32_TYPE__ int32_t;
# endif /* __int8_t_defined */

# ifndef __uint32_t_defined  /* more glibc compatibility */
# define __uint32_t_defined
typedef __UINT32_TYPE__ uint32_t;
# endif /* __uint32_t_defined */

# undef __int_least32_t
# define __int_least32_t int32_t
# undef __uint_least32_t
# define __uint_least32_t uint32_t
# undef __int_least16_t
# define __int_least16_t int32_t
# undef __uint_least16_t
# define __uint_least16_t uint32_t
# undef __int_least8_t
# define __int_least8_t int32_t
# undef __uint_least8_t
# define __uint_least8_t uint32_t
#endif /* __INT32_TYPE__ */

#ifdef __int_least32_t
typedef __int_least32_t int_least32_t;
typedef __uint_least32_t uint_least32_t;
typedef __int_least32_t int_fast32_t;
typedef __uint_least32_t uint_fast32_t;
#endif /* __int_least32_t */

#ifdef __INT24_TYPE__
typedef __INT24_TYPE__ int24_t;
typedef __UINT24_TYPE__ uint24_t;
typedef int24_t int_least24_t;
typedef uint24_t uint_least24_t;
typedef int24_t int_fast24_t;
typedef uint24_t uint_fast24_t;
# undef __int_least16_t
# define __int_least16_t int24_t
# undef __uint_least16_t
# define __uint_least16_t uint24_t
# undef __int_least8_t
# define __int_least8_t int24_t
# undef __uint_least8_t
# define __uint_least8_t uint24_t
#endif /* __INT24_TYPE__ */

#ifdef __INT16_TYPE__
#ifndef __int8_t_defined /* glibc sys/types.h also defines int16_t*/
typedef __INT16_TYPE__ int16_t;
#endif /* __int8_t_defined */
typedef __UINT16_TYPE__ uint16_t;
# undef __int_least16_t
# define __int_least16_t int16_t
# undef __uint_least16_t
# define __uint_least16_t uint16_t
# undef __int_least8_t
# define __int_least8_t int16_t
# undef __uint_least8_t
# define __uint_least8_t uint16_t
#endif /* __INT16_TYPE__ */

#ifdef __int_least16_t
typedef __int_least16_t int_least16_t;
typedef __uint_least16_t uint_least16_t;
typedef __int_least16_t int_fast16_t;
typedef __uint_least16_t uint_fast16_t;
#endif /* __int_least16_t */


#ifdef __INT8_TYPE__
#ifndef __int8_t_defined  /* glibc sys/types.h also defines int8_t*/
typedef __INT8_TYPE__ int8_t;
#endif /* __int8_t_defined */
typedef __UINT8_TYPE__ uint8_t;
# undef __int_least8_t
# define __int_least8_t int8_t
# undef __uint_least8_t
# define __uint_least8_t uint8_t
#endif /* __INT8_TYPE__ */

#ifdef __int_least8_t
typedef __int_least8_t int_least8_t;
typedef __uint_least8_t uint_least8_t;
typedef __int_least8_t int_fast8_t;
typedef __uint_least8_t uint_fast8_t;
#endif /* __int_least8_t */

/* prevent glibc sys/types.h from defining conflicting types */
#ifndef __int8_t_defined
# define __int8_t_defined
#endif /* __int8_t_defined */

/* C99 7.18.1.4 Integer types capable of holding object pointers.
 */
#define __stdint_join3(a,b,c) a ## b ## c

#ifndef _INTPTR_T
#ifndef __intptr_t_defined
typedef __INTPTR_TYPE__ intptr_t;
#define __intptr_t_defined
#define _INTPTR_T
#endif
#endif

#ifndef _UINTPTR_T
typedef __UINTPTR_TYPE__ uintptr_t;
#define _UINTPTR_T
#endif

/* C99 7.18.1.5 Greatest-width integer types.
 */
typedef __INTMAX_TYPE__  intmax_t;
typedef __UINTMAX_TYPE__ uintmax_t;

/* C99 7.18.4 Macros for minimum-width integer constants.
 *
 * The standard requires that integer constant macros be defined for all the
 * minimum-width types defined above. As 8-, 16-, 32-, and 64-bit minimum-width
 * types are required, the corresponding integer constant macros are defined
 * here. This implementation also defines minimum-width types for every other
 * integer width that the target implements, so corresponding macros are
 * defined below, too.
 *
 * Note that C++ should not check __STDC_CONSTANT_MACROS here, contrary to the
 * claims of the C standard (see C++ 18.3.1p2, [cstdint.syn]).
 */

#ifdef __int_least64_t
#define INT64_C(v) __INT64_C(v)
#define UINT64_C(v) __UINT64_C(v)
#endif /* __int_least64_t */


#ifdef __INT56_TYPE__
#define INT56_C(v) __INT56_C(v)
#define UINT56_C(v) __UINT56_C(v)
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
#define INT48_C(v) __INT48_C(v)
#define UINT48_C(v) __UINT48_C(v)
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
#define INT40_C(v) __INT40_C(v)
#define UINT40_C(v) __UINT40_C(v)
#endif /* __INT40_TYPE__ */


#ifdef __int_least32_t
#define INT32_C(v) __INT32_C(v)
#define UINT32_C(v) __UINT32_C(v)
#endif /* __int_least32_t */


#ifdef __INT24_TYPE__
#define INT24_C(v) __INT24_C(v)
#define UINT24_C(v) __UINT24_C(v)
#endif /* __INT24_TYPE__ */


#ifdef __int_least16_t
#define INT16_C(v) __INT16_C(v)
#define UINT16_C(v) __UINT16_C(v)
#endif /* __int_least16_t */


#ifdef __int_least8_t
#define INT8_C(v) __INT8_C(v)
#define UINT8_C(v) __UINT8_C(v)
#endif /* __int_least8_t */


/* C99 7.18.2.1 Limits of exact-width integer types.
 * C99 7.18.2.2 Limits of minimum-width integer types.
 * C99 7.18.2.3 Limits of fastest minimum-width integer types.
 *
 * The presence of limit macros are completely optional in C99.  This
 * implementation defines limits for all of the types (exact- and
 * minimum-width) that it defines above, using the limits of the minimum-width
 * type for any types that do not have exact-width representations.
 *
 * As in the type definitions, this section takes an approach of
 * successive-shrinking to determine which limits to use for the standard (8,
 * 16, 32, 64) bit widths when they don't have exact representations. It is
 * therefore important that the definitions be kept in order of decending
 * widths.
 *
 * Note that C++ should not check __STDC_LIMIT_MACROS here, contrary to the
 * claims of the C standard (see C++ 18.3.1p2, [cstdint.syn]).
 */

#ifdef __INT64_TYPE__
# define INT64_MAX           INT64_C( 9223372036854775807)
# define INT64_MIN         (-INT64_C( 9223372036854775807)-1)
# define UINT64_MAX         UINT64_C(18446744073709551615)

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT64_WIDTH         64
# define INT64_WIDTH          UINT64_WIDTH

# define __UINT_LEAST64_WIDTH UINT64_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT64_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT64_WIDTH
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX UINT64_MAX
#endif /* __STDC_VERSION__ */

# define __INT_LEAST64_MIN   INT64_MIN
# define __INT_LEAST64_MAX   INT64_MAX
# define __UINT_LEAST64_MAX UINT64_MAX
# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT64_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT64_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT64_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT64_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT64_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT64_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT64_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT64_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT64_MAX
#endif /* __INT64_TYPE__ */

#ifdef __INT_LEAST64_MIN
# define INT_LEAST64_MIN   __INT_LEAST64_MIN
# define INT_LEAST64_MAX   __INT_LEAST64_MAX
# define UINT_LEAST64_MAX __UINT_LEAST64_MAX
# define INT_FAST64_MIN    __INT_LEAST64_MIN
# define INT_FAST64_MAX    __INT_LEAST64_MAX
# define UINT_FAST64_MAX  __UINT_LEAST64_MAX

#if defined(__STDC_VERSION__) &&  __STDC_VERSION__ >= 202311L
# define UINT_LEAST64_WIDTH __UINT_LEAST64_WIDTH
# define INT_LEAST64_WIDTH  UINT_LEAST64_WIDTH
# define UINT_FAST64_WIDTH  __UINT_LEAST64_WIDTH
# define INT_FAST64_WIDTH   UINT_FAST64_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST64_MIN */


#ifdef __INT56_TYPE__
# define INT56_MAX           INT56_C(36028797018963967)
# define INT56_MIN         (-INT56_C(36028797018963967)-1)
# define UINT56_MAX         UINT56_C(72057594037927935)
# define INT_LEAST56_MIN     INT56_MIN
# define INT_LEAST56_MAX     INT56_MAX
# define UINT_LEAST56_MAX   UINT56_MAX
# define INT_FAST56_MIN      INT56_MIN
# define INT_FAST56_MAX      INT56_MAX
# define UINT_FAST56_MAX    UINT56_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT56_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT56_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT56_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT56_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT56_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT56_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT56_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT56_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT56_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT56_WIDTH         56
# define INT56_WIDTH          UINT56_WIDTH
# define UINT_LEAST56_WIDTH   UINT56_WIDTH
# define INT_LEAST56_WIDTH    UINT_LEAST56_WIDTH
# define UINT_FAST56_WIDTH    UINT56_WIDTH
# define INT_FAST56_WIDTH     UINT_FAST56_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT56_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT56_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT56_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
# define INT48_MAX           INT48_C(140737488355327)
# define INT48_MIN         (-INT48_C(140737488355327)-1)
# define UINT48_MAX         UINT48_C(281474976710655)
# define INT_LEAST48_MIN     INT48_MIN
# define INT_LEAST48_MAX     INT48_MAX
# define UINT_LEAST48_MAX   UINT48_MAX
# define INT_FAST48_MIN      INT48_MIN
# define INT_FAST48_MAX      INT48_MAX
# define UINT_FAST48_MAX    UINT48_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT48_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT48_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT48_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT48_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT48_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT48_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT48_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT48_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT48_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define UINT48_WIDTH         48
#define INT48_WIDTH          UINT48_WIDTH
#define UINT_LEAST48_WIDTH   UINT48_WIDTH
#define INT_LEAST48_WIDTH    UINT_LEAST48_WIDTH
#define UINT_FAST48_WIDTH    UINT48_WIDTH
#define INT_FAST48_WIDTH     UINT_FAST48_WIDTH
#undef __UINT_LEAST32_WIDTH
#define __UINT_LEAST32_WIDTH UINT48_WIDTH
# undef __UINT_LEAST16_WIDTH
#define __UINT_LEAST16_WIDTH UINT48_WIDTH
# undef __UINT_LEAST8_WIDTH
#define __UINT_LEAST8_WIDTH  UINT48_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
# define INT40_MAX           INT40_C(549755813887)
# define INT40_MIN         (-INT40_C(549755813887)-1)
# define UINT40_MAX         UINT40_C(1099511627775)
# define INT_LEAST40_MIN     INT40_MIN
# define INT_LEAST40_MAX     INT40_MAX
# define UINT_LEAST40_MAX   UINT40_MAX
# define INT_FAST40_MIN      INT40_MIN
# define INT_FAST40_MAX      INT40_MAX
# define UINT_FAST40_MAX    UINT40_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT40_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT40_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT40_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT40_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT40_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT40_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT40_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT40_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT40_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT40_WIDTH         40
# define INT40_WIDTH          UINT40_WIDTH
# define UINT_LEAST40_WIDTH   UINT40_WIDTH
# define INT_LEAST40_WIDTH    UINT_LEAST40_WIDTH
# define UINT_FAST40_WIDTH    UINT40_WIDTH
# define INT_FAST40_WIDTH     UINT_FAST40_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT40_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT40_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT40_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT40_TYPE__ */


#ifdef __INT32_TYPE__
# define INT32_MAX           INT32_C(2147483647)
# define INT32_MIN         (-INT32_C(2147483647)-1)
# define UINT32_MAX         UINT32_C(4294967295)

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT32_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT32_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT32_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT32_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT32_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT32_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT32_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT32_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT32_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT32_WIDTH         32
# define INT32_WIDTH          UINT32_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT32_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT32_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT32_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT32_TYPE__ */

#ifdef __INT_LEAST32_MIN
# define INT_LEAST32_MIN   __INT_LEAST32_MIN
# define INT_LEAST32_MAX   __INT_LEAST32_MAX
# define UINT_LEAST32_MAX __UINT_LEAST32_MAX
# define INT_FAST32_MIN    __INT_LEAST32_MIN
# define INT_FAST32_MAX    __INT_LEAST32_MAX
# define UINT_FAST32_MAX  __UINT_LEAST32_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST32_WIDTH __UINT_LEAST32_WIDTH
# define INT_LEAST32_WIDTH  UINT_LEAST32_WIDTH
# define UINT_FAST32_WIDTH  __UINT_LEAST32_WIDTH
# define INT_FAST32_WIDTH   UINT_FAST32_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST32_MIN */


#ifdef __INT24_TYPE__
# define INT24_MAX           INT24_C(8388607)
# define INT24_MIN         (-INT24_C(8388607)-1)
# define UINT24_MAX         UINT24_C(16777215)
# define INT_LEAST24_MIN     INT24_MIN
# define INT_LEAST24_MAX     INT24_MAX
# define UINT_LEAST24_MAX   UINT24_MAX
# define INT_FAST24_MIN      INT24_MIN
# define INT_FAST24_MAX      INT24_MAX
# define UINT_FAST24_MAX    UINT24_MAX

# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT24_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT24_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT24_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT24_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT24_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT24_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT24_WIDTH         24
# define INT24_WIDTH          UINT24_WIDTH
# define UINT_LEAST24_WIDTH   UINT24_WIDTH
# define INT_LEAST24_WIDTH    UINT_LEAST24_WIDTH
# define UINT_FAST24_WIDTH    UINT24_WIDTH
# define INT_FAST24_WIDTH     UINT_FAST24_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT24_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT24_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT24_TYPE__ */


#ifdef __INT16_TYPE__
#define INT16_MAX            INT16_C(32767)
#define INT16_MIN          (-INT16_C(32767)-1)
#define UINT16_MAX          UINT16_C(65535)

# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT16_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT16_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT16_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT16_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT16_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT16_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT16_WIDTH         16
# define INT16_WIDTH          UINT16_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT16_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT16_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT16_TYPE__ */

#ifdef __INT_LEAST16_MIN
# define INT_LEAST16_MIN   __INT_LEAST16_MIN
# define INT_LEAST16_MAX   __INT_LEAST16_MAX
# define UINT_LEAST16_MAX __UINT_LEAST16_MAX
# define INT_FAST16_MIN    __INT_LEAST16_MIN
# define INT_FAST16_MAX    __INT_LEAST16_MAX
# define UINT_FAST16_MAX  __UINT_LEAST16_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST16_WIDTH __UINT_LEAST16_WIDTH
# define INT_LEAST16_WIDTH  UINT_LEAST16_WIDTH
# define UINT_FAST16_WIDTH  __UINT_LEAST16_WIDTH
# define INT_FAST16_WIDTH   UINT_FAST16_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST16_MIN */


#ifdef __INT8_TYPE__
# define INT8_MAX            INT8_C(127)
# define INT8_MIN          (-INT8_C(127)-1)
# define UINT8_MAX          UINT8_C(255)

# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT8_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT8_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT8_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT8_WIDTH         8
# define INT8_WIDTH          UINT8_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH UINT8_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT8_TYPE__ */

#ifdef __INT_LEAST8_MIN
# define INT_LEAST8_MIN   __INT_LEAST8_MIN
# define INT_LEAST8_MAX   __INT_LEAST8_MAX
# define UINT_LEAST8_MAX __UINT_LEAST8_MAX
# define INT_FAST8_MIN    __INT_LEAST8_MIN
# define INT_FAST8_MAX    __INT_LEAST8_MAX
# define UINT_FAST8_MAX  __UINT_LEAST8_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST8_WIDTH __UINT_LEAST8_WIDTH
# define INT_LEAST8_WIDTH  UINT_LEAST8_WIDTH
# define UINT_FAST8_WIDTH  __UINT_LEAST8_WIDTH
# define INT_FAST8_WIDTH   UINT_FAST8_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST8_MIN */

/* Some utility macros */
#define  __INTN_MIN(n)  __stdint_join3( INT, n, _MIN)
#define  __INTN_MAX(n)  __stdint_join3( INT, n, _MAX)
#define __UINTN_MAX(n)  __stdint_join3(UINT, n, _MAX)
#define  __INTN_C(n, v) __stdint_join3( INT, n, _C(v))
#define __UINTN_C(n, v) __stdint_join3(UINT, n, _C(v))

/* C99 7.18.2.4 Limits of integer types capable of holding object pointers. */
/* C99 7.18.3 Limits of other integer types. */

#define  INTPTR_MIN  (-__INTPTR_MAX__-1)
#define  INTPTR_MAX    __INTPTR_MAX__
#define UINTPTR_MAX   __UINTPTR_MAX__
#define PTRDIFF_MIN (-__PTRDIFF_MAX__-1)
#define PTRDIFF_MAX   __PTRDIFF_MAX__
#define    SIZE_MAX      __SIZE_MAX__

/* C23 7.22.2.4 Width of integer types capable of holding object pointers. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* NB: The C standard requires that these be the same value, but the compiler
   exposes separate internal width macros. */
#define INTPTR_WIDTH  __INTPTR_WIDTH__
#define UINTPTR_WIDTH __UINTPTR_WIDTH__
#endif

/* ISO9899:2011 7.20 (C11 Annex K): Define RSIZE_MAX if __STDC_WANT_LIB_EXT1__
 * is enabled. */
#if defined(__STDC_WANT_LIB_EXT1__) && __STDC_WANT_LIB_EXT1__ >= 1
#define   RSIZE_MAX            (SIZE_MAX >> 1)
#endif

/* C99 7.18.2.5 Limits of greatest-width integer types. */
#define  INTMAX_MIN (-__INTMAX_MAX__-1)
#define  INTMAX_MAX   __INTMAX_MAX__
#define UINTMAX_MAX  __UINTMAX_MAX__

/* C23 7.22.2.5 Width of greatest-width integer types. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* NB: The C standard requires that these be the same value, but the compiler
   exposes separate internal width macros. */
#define INTMAX_WIDTH __INTMAX_WIDTH__
#define UINTMAX_WIDTH __UINTMAX_WIDTH__
#endif

/* C99 7.18.3 Limits of other integer types. */
#define SIG_ATOMIC_MIN __INTN_MIN(__SIG_ATOMIC_WIDTH__)
#define SIG_ATOMIC_MAX __INTN_MAX(__SIG_ATOMIC_WIDTH__)
#ifdef __WINT_UNSIGNED__
# define WINT_MIN       __UINTN_C(__WINT_WIDTH__, 0)
# define WINT_MAX       __UINTN_MAX(__WINT_WIDTH__)
#else
# define WINT_MIN       __INTN_MIN(__WINT_WIDTH__)
# define WINT_MAX       __INTN_MAX(__WINT_WIDTH__)
#endif

#ifndef WCHAR_MAX
# define WCHAR_MAX __WCHAR_MAX__
#endif
#ifndef WCHAR_MIN
# if __WCHAR_MAX__ == __INTN_MAX(__WCHAR_WIDTH__)
#  define WCHAR_MIN __INTN_MIN(__WCHAR_WIDTH__)
# else
#  define WCHAR_MIN __UINTN_C(__WCHAR_WIDTH__, 0)
# endif
#endif

/* 7.18.4.2 Macros for greatest-width integer constants. */
#define  INTMAX_C(v) __INTMAX_C(v)
#define UINTMAX_C(v) __UINTMAX_C(v)

/* C23 7.22.3.x Width of other integer types. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define PTRDIFF_WIDTH    __PTRDIFF_WIDTH__
#define SIG_ATOMIC_WIDTH __SIG_ATOMIC_WIDTH__
#define SIZE_WIDTH       __SIZE_WIDTH__
#define WCHAR_WIDTH      __WCHAR_WIDTH__
#define WINT_WIDTH       __WINT_WIDTH__
#endif

#endif /* __STDC_HOSTED__ */
#endif /* __MVS__ */
#endif /* __CLANG_STDINT_H */
`,"stdnoreturn.h":`/*===---- stdnoreturn.h - Standard header for noreturn macro ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDNORETURN_H
#define __STDNORETURN_H

#if defined(__MVS__) && __has_include_next(<stdnoreturn.h>)
#include_next <stdnoreturn.h>
#else

#define noreturn _Noreturn
#define __noreturn_is_defined 1

#endif /* __MVS__ */

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ > 201710L) &&               \\
    !defined(_CLANG_DISABLE_CRT_DEPRECATION_WARNINGS)
/* The noreturn macro is deprecated in C23. We do not mark it as such because
   including the header file in C23 is also deprecated and we do not want to
   issue a confusing diagnostic for code which includes <stdnoreturn.h>
   followed by code that writes [[noreturn]]. The issue with such code is not
   with the attribute, or the use of 'noreturn', but the inclusion of the
   header. */
/* FIXME: We should be issuing a deprecation warning here, but cannot yet due
 * to system headers which include this header file unconditionally.
 */
#endif

#endif /* __STDNORETURN_H */
`,"tgmath.h":`/*===---- tgmath.h - Standard header for type generic math ----------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_TGMATH_H
#define __CLANG_TGMATH_H

/* C99 7.22 Type-generic math <tgmath.h>. */
#include <math.h>

/*
 * Allow additional definitions and implementation-defined values on Apple
 * platforms. This is done after #include <math.h> to avoid depcycle conflicts
 * between libcxx and darwin in C++ modules builds.
 */
#if defined(__APPLE__) && __STDC_HOSTED__ && __has_include_next(<tgmath.h>)
#  include_next <tgmath.h>
#else

/* C++ handles type genericity with overloading in math.h. */
#ifndef __cplusplus
#include <complex.h>

#define _TG_ATTRSp __attribute__((__overloadable__))
#define _TG_ATTRS __attribute__((__overloadable__, __always_inline__))

// promotion

typedef void _Argument_type_is_not_arithmetic;
static _Argument_type_is_not_arithmetic __tg_promote(...)
  __attribute__((__unavailable__,__overloadable__));
static double               _TG_ATTRSp __tg_promote(int);
static double               _TG_ATTRSp __tg_promote(unsigned int);
static double               _TG_ATTRSp __tg_promote(long);
static double               _TG_ATTRSp __tg_promote(unsigned long);
static double               _TG_ATTRSp __tg_promote(long long);
static double               _TG_ATTRSp __tg_promote(unsigned long long);
static float                _TG_ATTRSp __tg_promote(float);
static double               _TG_ATTRSp __tg_promote(double);
static long double          _TG_ATTRSp __tg_promote(long double);
static float _Complex       _TG_ATTRSp __tg_promote(float _Complex);
static double _Complex      _TG_ATTRSp __tg_promote(double _Complex);
static long double _Complex _TG_ATTRSp __tg_promote(long double _Complex);

#define __tg_promote1(__x)           (__typeof__(__tg_promote(__x)))
#define __tg_promote2(__x, __y)      (__typeof__(__tg_promote(__x) + \\
                                                 __tg_promote(__y)))
#define __tg_promote3(__x, __y, __z) (__typeof__(__tg_promote(__x) + \\
                                                 __tg_promote(__y) + \\
                                                 __tg_promote(__z)))

// acos

static float
    _TG_ATTRS
    __tg_acos(float __x) {return acosf(__x);}

static double
    _TG_ATTRS
    __tg_acos(double __x) {return acos(__x);}

static long double
    _TG_ATTRS
    __tg_acos(long double __x) {return acosl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_acos(float _Complex __x) {return cacosf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_acos(double _Complex __x) {return cacos(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_acos(long double _Complex __x) {return cacosl(__x);}

#undef acos
#define acos(__x) __tg_acos(__tg_promote1((__x))(__x))

// asin

static float
    _TG_ATTRS
    __tg_asin(float __x) {return asinf(__x);}

static double
    _TG_ATTRS
    __tg_asin(double __x) {return asin(__x);}

static long double
    _TG_ATTRS
    __tg_asin(long double __x) {return asinl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_asin(float _Complex __x) {return casinf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_asin(double _Complex __x) {return casin(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_asin(long double _Complex __x) {return casinl(__x);}

#undef asin
#define asin(__x) __tg_asin(__tg_promote1((__x))(__x))

// atan

static float
    _TG_ATTRS
    __tg_atan(float __x) {return atanf(__x);}

static double
    _TG_ATTRS
    __tg_atan(double __x) {return atan(__x);}

static long double
    _TG_ATTRS
    __tg_atan(long double __x) {return atanl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_atan(float _Complex __x) {return catanf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_atan(double _Complex __x) {return catan(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_atan(long double _Complex __x) {return catanl(__x);}

#undef atan
#define atan(__x) __tg_atan(__tg_promote1((__x))(__x))

// acosh

static float
    _TG_ATTRS
    __tg_acosh(float __x) {return acoshf(__x);}

static double
    _TG_ATTRS
    __tg_acosh(double __x) {return acosh(__x);}

static long double
    _TG_ATTRS
    __tg_acosh(long double __x) {return acoshl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_acosh(float _Complex __x) {return cacoshf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_acosh(double _Complex __x) {return cacosh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_acosh(long double _Complex __x) {return cacoshl(__x);}

#undef acosh
#define acosh(__x) __tg_acosh(__tg_promote1((__x))(__x))

// asinh

static float
    _TG_ATTRS
    __tg_asinh(float __x) {return asinhf(__x);}

static double
    _TG_ATTRS
    __tg_asinh(double __x) {return asinh(__x);}

static long double
    _TG_ATTRS
    __tg_asinh(long double __x) {return asinhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_asinh(float _Complex __x) {return casinhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_asinh(double _Complex __x) {return casinh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_asinh(long double _Complex __x) {return casinhl(__x);}

#undef asinh
#define asinh(__x) __tg_asinh(__tg_promote1((__x))(__x))

// atanh

static float
    _TG_ATTRS
    __tg_atanh(float __x) {return atanhf(__x);}

static double
    _TG_ATTRS
    __tg_atanh(double __x) {return atanh(__x);}

static long double
    _TG_ATTRS
    __tg_atanh(long double __x) {return atanhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_atanh(float _Complex __x) {return catanhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_atanh(double _Complex __x) {return catanh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_atanh(long double _Complex __x) {return catanhl(__x);}

#undef atanh
#define atanh(__x) __tg_atanh(__tg_promote1((__x))(__x))

// cos

static float
    _TG_ATTRS
    __tg_cos(float __x) {return cosf(__x);}

static double
    _TG_ATTRS
    __tg_cos(double __x) {return cos(__x);}

static long double
    _TG_ATTRS
    __tg_cos(long double __x) {return cosl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cos(float _Complex __x) {return ccosf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cos(double _Complex __x) {return ccos(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cos(long double _Complex __x) {return ccosl(__x);}

#undef cos
#define cos(__x) __tg_cos(__tg_promote1((__x))(__x))

// sin

static float
    _TG_ATTRS
    __tg_sin(float __x) {return sinf(__x);}

static double
    _TG_ATTRS
    __tg_sin(double __x) {return sin(__x);}

static long double
    _TG_ATTRS
    __tg_sin(long double __x) {return sinl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sin(float _Complex __x) {return csinf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sin(double _Complex __x) {return csin(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sin(long double _Complex __x) {return csinl(__x);}

#undef sin
#define sin(__x) __tg_sin(__tg_promote1((__x))(__x))

// tan

static float
    _TG_ATTRS
    __tg_tan(float __x) {return tanf(__x);}

static double
    _TG_ATTRS
    __tg_tan(double __x) {return tan(__x);}

static long double
    _TG_ATTRS
    __tg_tan(long double __x) {return tanl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_tan(float _Complex __x) {return ctanf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_tan(double _Complex __x) {return ctan(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_tan(long double _Complex __x) {return ctanl(__x);}

#undef tan
#define tan(__x) __tg_tan(__tg_promote1((__x))(__x))

// cosh

static float
    _TG_ATTRS
    __tg_cosh(float __x) {return coshf(__x);}

static double
    _TG_ATTRS
    __tg_cosh(double __x) {return cosh(__x);}

static long double
    _TG_ATTRS
    __tg_cosh(long double __x) {return coshl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cosh(float _Complex __x) {return ccoshf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cosh(double _Complex __x) {return ccosh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cosh(long double _Complex __x) {return ccoshl(__x);}

#undef cosh
#define cosh(__x) __tg_cosh(__tg_promote1((__x))(__x))

// sinh

static float
    _TG_ATTRS
    __tg_sinh(float __x) {return sinhf(__x);}

static double
    _TG_ATTRS
    __tg_sinh(double __x) {return sinh(__x);}

static long double
    _TG_ATTRS
    __tg_sinh(long double __x) {return sinhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sinh(float _Complex __x) {return csinhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sinh(double _Complex __x) {return csinh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sinh(long double _Complex __x) {return csinhl(__x);}

#undef sinh
#define sinh(__x) __tg_sinh(__tg_promote1((__x))(__x))

// tanh

static float
    _TG_ATTRS
    __tg_tanh(float __x) {return tanhf(__x);}

static double
    _TG_ATTRS
    __tg_tanh(double __x) {return tanh(__x);}

static long double
    _TG_ATTRS
    __tg_tanh(long double __x) {return tanhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_tanh(float _Complex __x) {return ctanhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_tanh(double _Complex __x) {return ctanh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_tanh(long double _Complex __x) {return ctanhl(__x);}

#undef tanh
#define tanh(__x) __tg_tanh(__tg_promote1((__x))(__x))

// exp

static float
    _TG_ATTRS
    __tg_exp(float __x) {return expf(__x);}

static double
    _TG_ATTRS
    __tg_exp(double __x) {return exp(__x);}

static long double
    _TG_ATTRS
    __tg_exp(long double __x) {return expl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_exp(float _Complex __x) {return cexpf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_exp(double _Complex __x) {return cexp(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_exp(long double _Complex __x) {return cexpl(__x);}

#undef exp
#define exp(__x) __tg_exp(__tg_promote1((__x))(__x))

// log

static float
    _TG_ATTRS
    __tg_log(float __x) {return logf(__x);}

static double
    _TG_ATTRS
    __tg_log(double __x) {return log(__x);}

static long double
    _TG_ATTRS
    __tg_log(long double __x) {return logl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_log(float _Complex __x) {return clogf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_log(double _Complex __x) {return clog(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_log(long double _Complex __x) {return clogl(__x);}

#undef log
#define log(__x) __tg_log(__tg_promote1((__x))(__x))

// pow

static float
    _TG_ATTRS
    __tg_pow(float __x, float __y) {return powf(__x, __y);}

static double
    _TG_ATTRS
    __tg_pow(double __x, double __y) {return pow(__x, __y);}

static long double
    _TG_ATTRS
    __tg_pow(long double __x, long double __y) {return powl(__x, __y);}

static float _Complex
    _TG_ATTRS
    __tg_pow(float _Complex __x, float _Complex __y) {return cpowf(__x, __y);}

static double _Complex
    _TG_ATTRS
    __tg_pow(double _Complex __x, double _Complex __y) {return cpow(__x, __y);}

static long double _Complex
    _TG_ATTRS
    __tg_pow(long double _Complex __x, long double _Complex __y)
    {return cpowl(__x, __y);}

#undef pow
#define pow(__x, __y) __tg_pow(__tg_promote2((__x), (__y))(__x), \\
                               __tg_promote2((__x), (__y))(__y))

// sqrt

static float
    _TG_ATTRS
    __tg_sqrt(float __x) {return sqrtf(__x);}

static double
    _TG_ATTRS
    __tg_sqrt(double __x) {return sqrt(__x);}

static long double
    _TG_ATTRS
    __tg_sqrt(long double __x) {return sqrtl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sqrt(float _Complex __x) {return csqrtf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sqrt(double _Complex __x) {return csqrt(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sqrt(long double _Complex __x) {return csqrtl(__x);}

#undef sqrt
#define sqrt(__x) __tg_sqrt(__tg_promote1((__x))(__x))

// fabs

static float
    _TG_ATTRS
    __tg_fabs(float __x) {return fabsf(__x);}

static double
    _TG_ATTRS
    __tg_fabs(double __x) {return fabs(__x);}

static long double
    _TG_ATTRS
    __tg_fabs(long double __x) {return fabsl(__x);}

static float
    _TG_ATTRS
    __tg_fabs(float _Complex __x) {return cabsf(__x);}

static double
    _TG_ATTRS
    __tg_fabs(double _Complex __x) {return cabs(__x);}

static long double
    _TG_ATTRS
    __tg_fabs(long double _Complex __x) {return cabsl(__x);}

#undef fabs
#define fabs(__x) __tg_fabs(__tg_promote1((__x))(__x))

// atan2

static float
    _TG_ATTRS
    __tg_atan2(float __x, float __y) {return atan2f(__x, __y);}

static double
    _TG_ATTRS
    __tg_atan2(double __x, double __y) {return atan2(__x, __y);}

static long double
    _TG_ATTRS
    __tg_atan2(long double __x, long double __y) {return atan2l(__x, __y);}

#undef atan2
#define atan2(__x, __y) __tg_atan2(__tg_promote2((__x), (__y))(__x), \\
                                   __tg_promote2((__x), (__y))(__y))

// cbrt

static float
    _TG_ATTRS
    __tg_cbrt(float __x) {return cbrtf(__x);}

static double
    _TG_ATTRS
    __tg_cbrt(double __x) {return cbrt(__x);}

static long double
    _TG_ATTRS
    __tg_cbrt(long double __x) {return cbrtl(__x);}

#undef cbrt
#define cbrt(__x) __tg_cbrt(__tg_promote1((__x))(__x))

// ceil

static float
    _TG_ATTRS
    __tg_ceil(float __x) {return ceilf(__x);}

static double
    _TG_ATTRS
    __tg_ceil(double __x) {return ceil(__x);}

static long double
    _TG_ATTRS
    __tg_ceil(long double __x) {return ceill(__x);}

#undef ceil
#define ceil(__x) __tg_ceil(__tg_promote1((__x))(__x))

// copysign

static float
    _TG_ATTRS
    __tg_copysign(float __x, float __y) {return copysignf(__x, __y);}

static double
    _TG_ATTRS
    __tg_copysign(double __x, double __y) {return copysign(__x, __y);}

static long double
    _TG_ATTRS
    __tg_copysign(long double __x, long double __y) {return copysignl(__x, __y);}

#undef copysign
#define copysign(__x, __y) __tg_copysign(__tg_promote2((__x), (__y))(__x), \\
                                         __tg_promote2((__x), (__y))(__y))

// erf

static float
    _TG_ATTRS
    __tg_erf(float __x) {return erff(__x);}

static double
    _TG_ATTRS
    __tg_erf(double __x) {return erf(__x);}

static long double
    _TG_ATTRS
    __tg_erf(long double __x) {return erfl(__x);}

#undef erf
#define erf(__x) __tg_erf(__tg_promote1((__x))(__x))

// erfc

static float
    _TG_ATTRS
    __tg_erfc(float __x) {return erfcf(__x);}

static double
    _TG_ATTRS
    __tg_erfc(double __x) {return erfc(__x);}

static long double
    _TG_ATTRS
    __tg_erfc(long double __x) {return erfcl(__x);}

#undef erfc
#define erfc(__x) __tg_erfc(__tg_promote1((__x))(__x))

// exp2

static float
    _TG_ATTRS
    __tg_exp2(float __x) {return exp2f(__x);}

static double
    _TG_ATTRS
    __tg_exp2(double __x) {return exp2(__x);}

static long double
    _TG_ATTRS
    __tg_exp2(long double __x) {return exp2l(__x);}

#undef exp2
#define exp2(__x) __tg_exp2(__tg_promote1((__x))(__x))

// expm1

static float
    _TG_ATTRS
    __tg_expm1(float __x) {return expm1f(__x);}

static double
    _TG_ATTRS
    __tg_expm1(double __x) {return expm1(__x);}

static long double
    _TG_ATTRS
    __tg_expm1(long double __x) {return expm1l(__x);}

#undef expm1
#define expm1(__x) __tg_expm1(__tg_promote1((__x))(__x))

// fdim

static float
    _TG_ATTRS
    __tg_fdim(float __x, float __y) {return fdimf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fdim(double __x, double __y) {return fdim(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fdim(long double __x, long double __y) {return fdiml(__x, __y);}

#undef fdim
#define fdim(__x, __y) __tg_fdim(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// floor

static float
    _TG_ATTRS
    __tg_floor(float __x) {return floorf(__x);}

static double
    _TG_ATTRS
    __tg_floor(double __x) {return floor(__x);}

static long double
    _TG_ATTRS
    __tg_floor(long double __x) {return floorl(__x);}

#undef floor
#define floor(__x) __tg_floor(__tg_promote1((__x))(__x))

// fma

static float
    _TG_ATTRS
    __tg_fma(float __x, float __y, float __z)
    {return fmaf(__x, __y, __z);}

static double
    _TG_ATTRS
    __tg_fma(double __x, double __y, double __z)
    {return fma(__x, __y, __z);}

static long double
    _TG_ATTRS
    __tg_fma(long double __x,long double __y, long double __z)
    {return fmal(__x, __y, __z);}

#undef fma
#define fma(__x, __y, __z)                                \\
        __tg_fma(__tg_promote3((__x), (__y), (__z))(__x), \\
                 __tg_promote3((__x), (__y), (__z))(__y), \\
                 __tg_promote3((__x), (__y), (__z))(__z))

// fmax

static float
    _TG_ATTRS
    __tg_fmax(float __x, float __y) {return fmaxf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmax(double __x, double __y) {return fmax(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmax(long double __x, long double __y) {return fmaxl(__x, __y);}

#undef fmax
#define fmax(__x, __y) __tg_fmax(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// fmin

static float
    _TG_ATTRS
    __tg_fmin(float __x, float __y) {return fminf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmin(double __x, double __y) {return fmin(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmin(long double __x, long double __y) {return fminl(__x, __y);}

#undef fmin
#define fmin(__x, __y) __tg_fmin(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// fmod

static float
    _TG_ATTRS
    __tg_fmod(float __x, float __y) {return fmodf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmod(double __x, double __y) {return fmod(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmod(long double __x, long double __y) {return fmodl(__x, __y);}

#undef fmod
#define fmod(__x, __y) __tg_fmod(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// frexp

static float
    _TG_ATTRS
    __tg_frexp(float __x, int* __y) {return frexpf(__x, __y);}

static double
    _TG_ATTRS
    __tg_frexp(double __x, int* __y) {return frexp(__x, __y);}

static long double
    _TG_ATTRS
    __tg_frexp(long double __x, int* __y) {return frexpl(__x, __y);}

#undef frexp
#define frexp(__x, __y) __tg_frexp(__tg_promote1((__x))(__x), __y)

// hypot

static float
    _TG_ATTRS
    __tg_hypot(float __x, float __y) {return hypotf(__x, __y);}

static double
    _TG_ATTRS
    __tg_hypot(double __x, double __y) {return hypot(__x, __y);}

static long double
    _TG_ATTRS
    __tg_hypot(long double __x, long double __y) {return hypotl(__x, __y);}

#undef hypot
#define hypot(__x, __y) __tg_hypot(__tg_promote2((__x), (__y))(__x), \\
                                   __tg_promote2((__x), (__y))(__y))

// ilogb

static int
    _TG_ATTRS
    __tg_ilogb(float __x) {return ilogbf(__x);}

static int
    _TG_ATTRS
    __tg_ilogb(double __x) {return ilogb(__x);}

static int
    _TG_ATTRS
    __tg_ilogb(long double __x) {return ilogbl(__x);}

#undef ilogb
#define ilogb(__x) __tg_ilogb(__tg_promote1((__x))(__x))

// ldexp

static float
    _TG_ATTRS
    __tg_ldexp(float __x, int __y) {return ldexpf(__x, __y);}

static double
    _TG_ATTRS
    __tg_ldexp(double __x, int __y) {return ldexp(__x, __y);}

static long double
    _TG_ATTRS
    __tg_ldexp(long double __x, int __y) {return ldexpl(__x, __y);}

#undef ldexp
#define ldexp(__x, __y) __tg_ldexp(__tg_promote1((__x))(__x), __y)

// lgamma

static float
    _TG_ATTRS
    __tg_lgamma(float __x) {return lgammaf(__x);}

static double
    _TG_ATTRS
    __tg_lgamma(double __x) {return lgamma(__x);}

static long double
    _TG_ATTRS
    __tg_lgamma(long double __x) {return lgammal(__x);}

#undef lgamma
#define lgamma(__x) __tg_lgamma(__tg_promote1((__x))(__x))

// llrint

static long long
    _TG_ATTRS
    __tg_llrint(float __x) {return llrintf(__x);}

static long long
    _TG_ATTRS
    __tg_llrint(double __x) {return llrint(__x);}

static long long
    _TG_ATTRS
    __tg_llrint(long double __x) {return llrintl(__x);}

#undef llrint
#define llrint(__x) __tg_llrint(__tg_promote1((__x))(__x))

// llround

static long long
    _TG_ATTRS
    __tg_llround(float __x) {return llroundf(__x);}

static long long
    _TG_ATTRS
    __tg_llround(double __x) {return llround(__x);}

static long long
    _TG_ATTRS
    __tg_llround(long double __x) {return llroundl(__x);}

#undef llround
#define llround(__x) __tg_llround(__tg_promote1((__x))(__x))

// log10

static float
    _TG_ATTRS
    __tg_log10(float __x) {return log10f(__x);}

static double
    _TG_ATTRS
    __tg_log10(double __x) {return log10(__x);}

static long double
    _TG_ATTRS
    __tg_log10(long double __x) {return log10l(__x);}

#undef log10
#define log10(__x) __tg_log10(__tg_promote1((__x))(__x))

// log1p

static float
    _TG_ATTRS
    __tg_log1p(float __x) {return log1pf(__x);}

static double
    _TG_ATTRS
    __tg_log1p(double __x) {return log1p(__x);}

static long double
    _TG_ATTRS
    __tg_log1p(long double __x) {return log1pl(__x);}

#undef log1p
#define log1p(__x) __tg_log1p(__tg_promote1((__x))(__x))

// log2

static float
    _TG_ATTRS
    __tg_log2(float __x) {return log2f(__x);}

static double
    _TG_ATTRS
    __tg_log2(double __x) {return log2(__x);}

static long double
    _TG_ATTRS
    __tg_log2(long double __x) {return log2l(__x);}

#undef log2
#define log2(__x) __tg_log2(__tg_promote1((__x))(__x))

// logb

static float
    _TG_ATTRS
    __tg_logb(float __x) {return logbf(__x);}

static double
    _TG_ATTRS
    __tg_logb(double __x) {return logb(__x);}

static long double
    _TG_ATTRS
    __tg_logb(long double __x) {return logbl(__x);}

#undef logb
#define logb(__x) __tg_logb(__tg_promote1((__x))(__x))

// lrint

static long
    _TG_ATTRS
    __tg_lrint(float __x) {return lrintf(__x);}

static long
    _TG_ATTRS
    __tg_lrint(double __x) {return lrint(__x);}

static long
    _TG_ATTRS
    __tg_lrint(long double __x) {return lrintl(__x);}

#undef lrint
#define lrint(__x) __tg_lrint(__tg_promote1((__x))(__x))

// lround

static long
    _TG_ATTRS
    __tg_lround(float __x) {return lroundf(__x);}

static long
    _TG_ATTRS
    __tg_lround(double __x) {return lround(__x);}

static long
    _TG_ATTRS
    __tg_lround(long double __x) {return lroundl(__x);}

#undef lround
#define lround(__x) __tg_lround(__tg_promote1((__x))(__x))

// nearbyint

static float
    _TG_ATTRS
    __tg_nearbyint(float __x) {return nearbyintf(__x);}

static double
    _TG_ATTRS
    __tg_nearbyint(double __x) {return nearbyint(__x);}

static long double
    _TG_ATTRS
    __tg_nearbyint(long double __x) {return nearbyintl(__x);}

#undef nearbyint
#define nearbyint(__x) __tg_nearbyint(__tg_promote1((__x))(__x))

// nextafter

static float
    _TG_ATTRS
    __tg_nextafter(float __x, float __y) {return nextafterf(__x, __y);}

static double
    _TG_ATTRS
    __tg_nextafter(double __x, double __y) {return nextafter(__x, __y);}

static long double
    _TG_ATTRS
    __tg_nextafter(long double __x, long double __y) {return nextafterl(__x, __y);}

#undef nextafter
#define nextafter(__x, __y) __tg_nextafter(__tg_promote2((__x), (__y))(__x), \\
                                           __tg_promote2((__x), (__y))(__y))

// nexttoward

static float
    _TG_ATTRS
    __tg_nexttoward(float __x, long double __y) {return nexttowardf(__x, __y);}

static double
    _TG_ATTRS
    __tg_nexttoward(double __x, long double __y) {return nexttoward(__x, __y);}

static long double
    _TG_ATTRS
    __tg_nexttoward(long double __x, long double __y) {return nexttowardl(__x, __y);}

#undef nexttoward
#define nexttoward(__x, __y) __tg_nexttoward(__tg_promote1((__x))(__x), (__y))

// remainder

static float
    _TG_ATTRS
    __tg_remainder(float __x, float __y) {return remainderf(__x, __y);}

static double
    _TG_ATTRS
    __tg_remainder(double __x, double __y) {return remainder(__x, __y);}

static long double
    _TG_ATTRS
    __tg_remainder(long double __x, long double __y) {return remainderl(__x, __y);}

#undef remainder
#define remainder(__x, __y) __tg_remainder(__tg_promote2((__x), (__y))(__x), \\
                                           __tg_promote2((__x), (__y))(__y))

// remquo

static float
    _TG_ATTRS
    __tg_remquo(float __x, float __y, int* __z)
    {return remquof(__x, __y, __z);}

static double
    _TG_ATTRS
    __tg_remquo(double __x, double __y, int* __z)
    {return remquo(__x, __y, __z);}

static long double
    _TG_ATTRS
    __tg_remquo(long double __x,long double __y, int* __z)
    {return remquol(__x, __y, __z);}

#undef remquo
#define remquo(__x, __y, __z)                         \\
        __tg_remquo(__tg_promote2((__x), (__y))(__x), \\
                    __tg_promote2((__x), (__y))(__y), \\
                    (__z))

// rint

static float
    _TG_ATTRS
    __tg_rint(float __x) {return rintf(__x);}

static double
    _TG_ATTRS
    __tg_rint(double __x) {return rint(__x);}

static long double
    _TG_ATTRS
    __tg_rint(long double __x) {return rintl(__x);}

#undef rint
#define rint(__x) __tg_rint(__tg_promote1((__x))(__x))

// round

static float
    _TG_ATTRS
    __tg_round(float __x) {return roundf(__x);}

static double
    _TG_ATTRS
    __tg_round(double __x) {return round(__x);}

static long double
    _TG_ATTRS
    __tg_round(long double __x) {return roundl(__x);}

#undef round
#define round(__x) __tg_round(__tg_promote1((__x))(__x))

// scalbn

static float
    _TG_ATTRS
    __tg_scalbn(float __x, int __y) {return scalbnf(__x, __y);}

static double
    _TG_ATTRS
    __tg_scalbn(double __x, int __y) {return scalbn(__x, __y);}

static long double
    _TG_ATTRS
    __tg_scalbn(long double __x, int __y) {return scalbnl(__x, __y);}

#undef scalbn
#define scalbn(__x, __y) __tg_scalbn(__tg_promote1((__x))(__x), __y)

// scalbln

static float
    _TG_ATTRS
    __tg_scalbln(float __x, long __y) {return scalblnf(__x, __y);}

static double
    _TG_ATTRS
    __tg_scalbln(double __x, long __y) {return scalbln(__x, __y);}

static long double
    _TG_ATTRS
    __tg_scalbln(long double __x, long __y) {return scalblnl(__x, __y);}

#undef scalbln
#define scalbln(__x, __y) __tg_scalbln(__tg_promote1((__x))(__x), __y)

// tgamma

static float
    _TG_ATTRS
    __tg_tgamma(float __x) {return tgammaf(__x);}

static double
    _TG_ATTRS
    __tg_tgamma(double __x) {return tgamma(__x);}

static long double
    _TG_ATTRS
    __tg_tgamma(long double __x) {return tgammal(__x);}

#undef tgamma
#define tgamma(__x) __tg_tgamma(__tg_promote1((__x))(__x))

// trunc

static float
    _TG_ATTRS
    __tg_trunc(float __x) {return truncf(__x);}

static double
    _TG_ATTRS
    __tg_trunc(double __x) {return trunc(__x);}

static long double
    _TG_ATTRS
    __tg_trunc(long double __x) {return truncl(__x);}

#undef trunc
#define trunc(__x) __tg_trunc(__tg_promote1((__x))(__x))

// carg

static float
    _TG_ATTRS
    __tg_carg(float __x) {return atan2f(0.F, __x);}

static double
    _TG_ATTRS
    __tg_carg(double __x) {return atan2(0., __x);}

static long double
    _TG_ATTRS
    __tg_carg(long double __x) {return atan2l(0.L, __x);}

static float
    _TG_ATTRS
    __tg_carg(float _Complex __x) {return cargf(__x);}

static double
    _TG_ATTRS
    __tg_carg(double _Complex __x) {return carg(__x);}

static long double
    _TG_ATTRS
    __tg_carg(long double _Complex __x) {return cargl(__x);}

#undef carg
#define carg(__x) __tg_carg(__tg_promote1((__x))(__x))

// cimag

static float
    _TG_ATTRS
    __tg_cimag(float __x) {return 0;}

static double
    _TG_ATTRS
    __tg_cimag(double __x) {return 0;}

static long double
    _TG_ATTRS
    __tg_cimag(long double __x) {return 0;}

static float
    _TG_ATTRS
    __tg_cimag(float _Complex __x) {return cimagf(__x);}

static double
    _TG_ATTRS
    __tg_cimag(double _Complex __x) {return cimag(__x);}

static long double
    _TG_ATTRS
    __tg_cimag(long double _Complex __x) {return cimagl(__x);}

#undef cimag
#define cimag(__x) __tg_cimag(__tg_promote1((__x))(__x))

// conj

static float _Complex
    _TG_ATTRS
    __tg_conj(float __x) {return __x;}

static double _Complex
    _TG_ATTRS
    __tg_conj(double __x) {return __x;}

static long double _Complex
    _TG_ATTRS
    __tg_conj(long double __x) {return __x;}

static float _Complex
    _TG_ATTRS
    __tg_conj(float _Complex __x) {return conjf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_conj(double _Complex __x) {return conj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_conj(long double _Complex __x) {return conjl(__x);}

#undef conj
#define conj(__x) __tg_conj(__tg_promote1((__x))(__x))

// cproj

static float _Complex
    _TG_ATTRS
    __tg_cproj(float __x) {return cprojf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cproj(double __x) {return cproj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cproj(long double __x) {return cprojl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cproj(float _Complex __x) {return cprojf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cproj(double _Complex __x) {return cproj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cproj(long double _Complex __x) {return cprojl(__x);}

#undef cproj
#define cproj(__x) __tg_cproj(__tg_promote1((__x))(__x))

// creal

static float
    _TG_ATTRS
    __tg_creal(float __x) {return __x;}

static double
    _TG_ATTRS
    __tg_creal(double __x) {return __x;}

static long double
    _TG_ATTRS
    __tg_creal(long double __x) {return __x;}

static float
    _TG_ATTRS
    __tg_creal(float _Complex __x) {return crealf(__x);}

static double
    _TG_ATTRS
    __tg_creal(double _Complex __x) {return creal(__x);}

static long double
    _TG_ATTRS
    __tg_creal(long double _Complex __x) {return creall(__x);}

#undef creal
#define creal(__x) __tg_creal(__tg_promote1((__x))(__x))

#undef _TG_ATTRSp
#undef _TG_ATTRS

#endif /* __cplusplus */
#endif /* __has_include_next */
#endif /* __CLANG_TGMATH_H */
`,"unwind.h":`/*===---- unwind.h - Stack unwinding ----------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/* See "Data Definitions for libgcc_s" in the Linux Standard Base.*/

#ifndef __CLANG_UNWIND_H
#define __CLANG_UNWIND_H

#if defined(__APPLE__) && __has_include_next(<unwind.h>)
/* Darwin (from 11.x on) provide an unwind.h. If that's available,
 * use it. libunwind wraps some of its definitions in #ifdef _GNU_SOURCE,
 * so define that around the include.*/
# ifndef _GNU_SOURCE
#  define _SHOULD_UNDEFINE_GNU_SOURCE
#  define _GNU_SOURCE
# endif
// libunwind's unwind.h reflects the current visibility.  However, Mozilla
// builds with -fvisibility=hidden and relies on gcc's unwind.h to reset the
// visibility to default and export its contents.  gcc also allows users to
// override its override by #defining HIDE_EXPORTS (but note, this only obeys
// the user's -fvisibility setting; it doesn't hide any exports on its own).  We
// imitate gcc's header here:
# ifdef HIDE_EXPORTS
#  include_next <unwind.h>
# else
#  pragma GCC visibility push(default)
#  include_next <unwind.h>
#  pragma GCC visibility pop
# endif
# ifdef _SHOULD_UNDEFINE_GNU_SOURCE
#  undef _GNU_SOURCE
#  undef _SHOULD_UNDEFINE_GNU_SOURCE
# endif
#else

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/* It is a bit strange for a header to play with the visibility of the
   symbols it declares, but this matches gcc's behavior and some programs
   depend on it */
#ifndef HIDE_EXPORTS
#pragma GCC visibility push(default)
#endif

typedef uintptr_t _Unwind_Word __attribute__((__mode__(__unwind_word__)));
typedef intptr_t _Unwind_Sword __attribute__((__mode__(__unwind_word__)));
typedef uintptr_t _Unwind_Ptr;
typedef uintptr_t _Unwind_Internal_Ptr;
typedef uint64_t _Unwind_Exception_Class;

typedef intptr_t _sleb128_t;
typedef uintptr_t _uleb128_t;

struct _Unwind_Context;
#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) || \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
struct _Unwind_Control_Block;
typedef struct _Unwind_Control_Block _Unwind_Control_Block;
#define _Unwind_Exception _Unwind_Control_Block /* Alias */
#else
struct _Unwind_Exception;
typedef struct _Unwind_Exception _Unwind_Exception;
#endif
typedef enum {
  _URC_NO_REASON = 0,
#if defined(__arm__) && !defined(__USING_SJLJ_EXCEPTIONS__) && \\
    !defined(__ARM_DWARF_EH__) && !defined(__SEH__)
  _URC_OK = 0, /* used by ARM EHABI */
#endif
  _URC_FOREIGN_EXCEPTION_CAUGHT = 1,

  _URC_FATAL_PHASE2_ERROR = 2,
  _URC_FATAL_PHASE1_ERROR = 3,
  _URC_NORMAL_STOP = 4,

  _URC_END_OF_STACK = 5,
  _URC_HANDLER_FOUND = 6,
  _URC_INSTALL_CONTEXT = 7,
  _URC_CONTINUE_UNWIND = 8,
#if defined(__arm__) && !defined(__USING_SJLJ_EXCEPTIONS__) && \\
    !defined(__ARM_DWARF_EH__) && !defined(__SEH__)
  _URC_FAILURE = 9 /* used by ARM EHABI */
#endif
} _Unwind_Reason_Code;

typedef enum {
  _UA_SEARCH_PHASE = 1,
  _UA_CLEANUP_PHASE = 2,

  _UA_HANDLER_FRAME = 4,
  _UA_FORCE_UNWIND = 8,
  _UA_END_OF_STACK = 16 /* gcc extension to C++ ABI */
} _Unwind_Action;

typedef void (*_Unwind_Exception_Cleanup_Fn)(_Unwind_Reason_Code,
                                             _Unwind_Exception *);

#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) || \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
typedef struct _Unwind_Control_Block _Unwind_Control_Block;
typedef uint32_t _Unwind_EHT_Header;

struct _Unwind_Control_Block {
  uint64_t exception_class;
  void (*exception_cleanup)(_Unwind_Reason_Code, _Unwind_Control_Block *);
  /* unwinder cache (private fields for the unwinder's use) */
  struct {
    uint32_t reserved1; /* forced unwind stop function, 0 if not forced */
    uint32_t reserved2; /* personality routine */
    uint32_t reserved3; /* callsite */
    uint32_t reserved4; /* forced unwind stop argument */
    uint32_t reserved5;
  } unwinder_cache;
  /* propagation barrier cache (valid after phase 1) */
  struct {
    uint32_t sp;
    uint32_t bitpattern[5];
  } barrier_cache;
  /* cleanup cache (preserved over cleanup) */
  struct {
    uint32_t bitpattern[4];
  } cleanup_cache;
  /* personality cache (for personality's benefit) */
  struct {
    uint32_t fnstart;         /* function start address */
    _Unwind_EHT_Header *ehtp; /* pointer to EHT entry header word */
    uint32_t additional;      /* additional data */
    uint32_t reserved1;
  } pr_cache;
  long long int : 0; /* force alignment of next item to 8-byte boundary */
} __attribute__((__aligned__(8)));
#else
struct _Unwind_Exception {
  _Unwind_Exception_Class exception_class;
  _Unwind_Exception_Cleanup_Fn exception_cleanup;
#if !defined (__USING_SJLJ_EXCEPTIONS__) && defined (__SEH__)
  _Unwind_Word private_[6];
#else
  _Unwind_Word private_1;
  _Unwind_Word private_2;
#endif
  /* The Itanium ABI requires that _Unwind_Exception objects are "double-word
   * aligned".  GCC has interpreted this to mean "use the maximum useful
   * alignment for the target"; so do we. */
} __attribute__((__aligned__));
#endif

typedef _Unwind_Reason_Code (*_Unwind_Stop_Fn)(int, _Unwind_Action,
                                               _Unwind_Exception_Class,
                                               _Unwind_Exception *,
                                               struct _Unwind_Context *,
                                               void *);

typedef _Unwind_Reason_Code (*_Unwind_Personality_Fn)(int, _Unwind_Action,
                                                      _Unwind_Exception_Class,
                                                      _Unwind_Exception *,
                                                      struct _Unwind_Context *);
typedef _Unwind_Personality_Fn __personality_routine;

typedef _Unwind_Reason_Code (*_Unwind_Trace_Fn)(struct _Unwind_Context *,
                                                void *);

#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) ||                \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
typedef enum {
  _UVRSC_CORE = 0,        /* integer register */
  _UVRSC_VFP = 1,         /* vfp */
  _UVRSC_WMMXD = 3,       /* Intel WMMX data register */
  _UVRSC_WMMXC = 4,       /* Intel WMMX control register */
  _UVRSC_PSEUDO = 5       /* Special purpose pseudo register */
} _Unwind_VRS_RegClass;

typedef enum {
  _UVRSD_UINT32 = 0,
  _UVRSD_VFPX = 1,
  _UVRSD_UINT64 = 3,
  _UVRSD_FLOAT = 4,
  _UVRSD_DOUBLE = 5
} _Unwind_VRS_DataRepresentation;

typedef enum {
  _UVRSR_OK = 0,
  _UVRSR_NOT_IMPLEMENTED = 1,
  _UVRSR_FAILED = 2
} _Unwind_VRS_Result;

typedef uint32_t _Unwind_State;
#define _US_VIRTUAL_UNWIND_FRAME  ((_Unwind_State)0)
#define _US_UNWIND_FRAME_STARTING ((_Unwind_State)1)
#define _US_UNWIND_FRAME_RESUME   ((_Unwind_State)2)
#define _US_ACTION_MASK           ((_Unwind_State)3)
#define _US_FORCE_UNWIND          ((_Unwind_State)8)

_Unwind_VRS_Result _Unwind_VRS_Get(struct _Unwind_Context *__context,
  _Unwind_VRS_RegClass __regclass,
  uint32_t __regno,
  _Unwind_VRS_DataRepresentation __representation,
  void *__valuep);

_Unwind_VRS_Result _Unwind_VRS_Set(struct _Unwind_Context *__context,
  _Unwind_VRS_RegClass __regclass,
  uint32_t __regno,
  _Unwind_VRS_DataRepresentation __representation,
  void *__valuep);

static __inline__
_Unwind_Word _Unwind_GetGR(struct _Unwind_Context *__context, int __index) {
  _Unwind_Word __value;
  _Unwind_VRS_Get(__context, _UVRSC_CORE, __index, _UVRSD_UINT32, &__value);
  return __value;
}

static __inline__
void _Unwind_SetGR(struct _Unwind_Context *__context, int __index,
                   _Unwind_Word __value) {
  _Unwind_VRS_Set(__context, _UVRSC_CORE, __index, _UVRSD_UINT32, &__value);
}

static __inline__
_Unwind_Word _Unwind_GetIP(struct _Unwind_Context *__context) {
  _Unwind_Word __ip = _Unwind_GetGR(__context, 15);
  return __ip & ~(_Unwind_Word)(0x1); /* Remove thumb mode bit. */
}

static __inline__
void _Unwind_SetIP(struct _Unwind_Context *__context, _Unwind_Word __value) {
  _Unwind_Word __thumb_mode_bit = _Unwind_GetGR(__context, 15) & 0x1;
  _Unwind_SetGR(__context, 15, __value | __thumb_mode_bit);
}
#else
_Unwind_Word _Unwind_GetGR(struct _Unwind_Context *, int);
void _Unwind_SetGR(struct _Unwind_Context *, int, _Unwind_Word);

_Unwind_Word _Unwind_GetIP(struct _Unwind_Context *);
void _Unwind_SetIP(struct _Unwind_Context *, _Unwind_Word);
#endif


_Unwind_Word _Unwind_GetIPInfo(struct _Unwind_Context *, int *);

_Unwind_Word _Unwind_GetCFA(struct _Unwind_Context *);

_Unwind_Word _Unwind_GetBSP(struct _Unwind_Context *);

void *_Unwind_GetLanguageSpecificData(struct _Unwind_Context *);

_Unwind_Ptr _Unwind_GetRegionStart(struct _Unwind_Context *);

/* DWARF EH functions; currently not available on Darwin/ARM */
#if !defined(__APPLE__) || !defined(__arm__)
_Unwind_Reason_Code _Unwind_RaiseException(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_ForcedUnwind(_Unwind_Exception *, _Unwind_Stop_Fn,
                                         void *);
void _Unwind_DeleteException(_Unwind_Exception *);
void _Unwind_Resume(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_Resume_or_Rethrow(_Unwind_Exception *);

#endif

_Unwind_Reason_Code _Unwind_Backtrace(_Unwind_Trace_Fn, void *);

/* setjmp(3)/longjmp(3) stuff */
typedef struct SjLj_Function_Context *_Unwind_FunctionContext_t;

void _Unwind_SjLj_Register(_Unwind_FunctionContext_t);
void _Unwind_SjLj_Unregister(_Unwind_FunctionContext_t);
_Unwind_Reason_Code _Unwind_SjLj_RaiseException(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_SjLj_ForcedUnwind(_Unwind_Exception *,
                                              _Unwind_Stop_Fn, void *);
void _Unwind_SjLj_Resume(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_SjLj_Resume_or_Rethrow(_Unwind_Exception *);

void *_Unwind_FindEnclosingFunction(void *);

#ifdef __APPLE__

_Unwind_Ptr _Unwind_GetDataRelBase(struct _Unwind_Context *)
    __attribute__((__unavailable__));
_Unwind_Ptr _Unwind_GetTextRelBase(struct _Unwind_Context *)
    __attribute__((__unavailable__));

/* Darwin-specific functions */
void __register_frame(const void *);
void __deregister_frame(const void *);

struct dwarf_eh_bases {
  uintptr_t tbase;
  uintptr_t dbase;
  uintptr_t func;
};
void *_Unwind_Find_FDE(const void *, struct dwarf_eh_bases *);

void __register_frame_info_bases(const void *, void *, void *, void *)
  __attribute__((__unavailable__));
void __register_frame_info(const void *, void *) __attribute__((__unavailable__));
void __register_frame_info_table_bases(const void *, void*, void *, void *)
  __attribute__((__unavailable__));
void __register_frame_info_table(const void *, void *)
  __attribute__((__unavailable__));
void __register_frame_table(const void *) __attribute__((__unavailable__));
void __deregister_frame_info(const void *) __attribute__((__unavailable__));
void __deregister_frame_info_bases(const void *)__attribute__((__unavailable__));

#else

_Unwind_Ptr _Unwind_GetDataRelBase(struct _Unwind_Context *);
_Unwind_Ptr _Unwind_GetTextRelBase(struct _Unwind_Context *);

#endif


#ifndef HIDE_EXPORTS
#pragma GCC visibility pop
#endif

#ifdef __cplusplus
}
#endif

#endif

#endif /* __CLANG_UNWIND_H */
`,"varargs.h":`/*===---- varargs.h - Variable argument handling -------------------------------------===
*
* Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
* See https://llvm.org/LICENSE.txt for license information.
* SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
*
*===-----------------------------------------------------------------------===
*/
#ifndef __VARARGS_H
#define __VARARGS_H
#if defined(__MVS__) && __has_include_next(<varargs.h>)
#include_next <varargs.h>
#else
#error "Please use <stdarg.h> instead of <varargs.h>"
#endif /* __MVS__ */
#endif
`});var k_=Object.freeze({name:"clang",version:"22.1.8",revision:"ca7933e47d3a3451d81e72ac174dcb5aa28b59d1"}),Uo="/lib/clang/22";function wi(t,e,n){if(e?.name!==k_.name||e.version!==k_.version||e.revision!==k_.revision||n!==Uo)return!1;let _=new TextDecoder("utf-8",{fatal:!0}),i=[];for(let[s,o]of Object.entries(xi)){let a=`${n}/include/${s}`;try{let d=t.readFile(a);if(d!==null){if(_.decode(d)!==o)throw new Error(`Clang ${e.version} resource header differs from its pinned source: ${s}`)}else i.push([a,o])}catch(d){throw new Error(`Unable to inspect Clang ${e.version} resource header ${s}: ${d instanceof Error?d.message:String(d)}`,{cause:d})}}if(i.length)try{t.mkdirTree(`${n}/include`)}catch(s){throw new Error(`Unable to prepare Clang ${e.version} resource header directory: ${s instanceof Error?s.message:String(s)}`,{cause:s})}let r=new TextEncoder;for(let[s,o]of i)try{t.writeFile(s,r.encode(o))}catch(a){throw new Error(`Unable to install Clang ${e.version} resource header ${s.slice(s.lastIndexOf("/")+1)}: ${a instanceof Error?a.message:String(a)}`,{cause:a})}return!0}var Xt=Object.freeze({name:"clang",version:"22.1.8",revision:"ca7933e47d3a3451d81e72ac174dcb5aa28b59d1"}),Wt=Object.freeze({path:"ostream",bytes:8445,sha256:"f193fb44780e6aed1fb4cf9da83142fcceb62efc7d4087cd051c117db12fce81"}),Li=Object.freeze({"__algorithm/ranges_contains_subrange.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___ALGORITHM_RANGES_CONTAINS_SUBRANGE_H
#define _LIBCPP___ALGORITHM_RANGES_CONTAINS_SUBRANGE_H

#include <__algorithm/ranges_search.h>
#include <__config>
#include <__functional/identity.h>
#include <__functional/ranges_operations.h>
#include <__functional/reference_wrapper.h>
#include <__iterator/concepts.h>
#include <__iterator/indirectly_comparable.h>
#include <__iterator/projected.h>
#include <__ranges/access.h>
#include <__ranges/concepts.h>
#include <__ranges/size.h>
#include <__ranges/subrange.h>
#include <__utility/move.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_PUSH_MACROS
#include <__undef_macros>

#if _LIBCPP_STD_VER >= 23

_LIBCPP_BEGIN_NAMESPACE_STD

namespace ranges {
struct __contains_subrange {
  template <forward_iterator _Iter1,
            sentinel_for<_Iter1> _Sent1,
            forward_iterator _Iter2,
            sentinel_for<_Iter2> _Sent2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires indirectly_comparable<_Iter1, _Iter2, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr bool static operator()(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred __pred   = {},
      _Proj1 __proj1 = {},
      _Proj2 __proj2 = {}) {
    if (__first2 == __last2)
      return true;

    auto __ret = ranges::search(
        std::move(__first1), __last1, std::move(__first2), __last2, __pred, std::ref(__proj1), std::ref(__proj2));
    return __ret.empty() == false;
  }

  template <forward_range _Range1,
            forward_range _Range2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires indirectly_comparable<iterator_t<_Range1>, iterator_t<_Range2>, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr bool static
  operator()(_Range1&& __range1, _Range2&& __range2, _Pred __pred = {}, _Proj1 __proj1 = {}, _Proj2 __proj2 = {}) {
    if constexpr (sized_range<_Range2>) {
      if (ranges::size(__range2) == 0)
        return true;
    } else {
      if (ranges::begin(__range2) == ranges::end(__range2))
        return true;
    }

    auto __ret = ranges::search(__range1, __range2, __pred, std::ref(__proj1), std::ref(__proj2));
    return __ret.empty() == false;
  }
};

inline namespace __cpo {
inline constexpr auto contains_subrange = __contains_subrange{};
} // namespace __cpo
} // namespace ranges

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_STD_VER >= 23

_LIBCPP_POP_MACROS

#endif // _LIBCPP___ALGORITHM_RANGES_CONTAINS_SUBRANGE_H
`,"__algorithm/ranges_ends_with.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___ALGORITHM_RANGES_ENDS_WITH_H
#define _LIBCPP___ALGORITHM_RANGES_ENDS_WITH_H

#include <__algorithm/ranges_equal.h>
#include <__algorithm/ranges_starts_with.h>
#include <__config>
#include <__functional/identity.h>
#include <__functional/ranges_operations.h>
#include <__functional/reference_wrapper.h>
#include <__iterator/advance.h>
#include <__iterator/concepts.h>
#include <__iterator/distance.h>
#include <__iterator/indirectly_comparable.h>
#include <__iterator/reverse_iterator.h>
#include <__ranges/access.h>
#include <__ranges/concepts.h>
#include <__ranges/size.h>
#include <__utility/move.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_PUSH_MACROS
#include <__undef_macros>

#if _LIBCPP_STD_VER >= 23

_LIBCPP_BEGIN_NAMESPACE_STD

namespace ranges {
struct __ends_with {
  template <class _Iter1, class _Sent1, class _Iter2, class _Sent2, class _Pred, class _Proj1, class _Proj2>
  _LIBCPP_HIDE_FROM_ABI static constexpr bool __ends_with_fn_impl_bidirectional(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred& __pred,
      _Proj1& __proj1,
      _Proj2& __proj2) {
    auto __rbegin1 = std::make_reverse_iterator(__last1);
    auto __rend1   = std::make_reverse_iterator(__first1);
    auto __rbegin2 = std::make_reverse_iterator(__last2);
    auto __rend2   = std::make_reverse_iterator(__first2);
    return ranges::starts_with(
        __rbegin1, __rend1, __rbegin2, __rend2, std::ref(__pred), std::ref(__proj1), std::ref(__proj2));
  }

  template <class _Iter1, class _Sent1, class _Iter2, class _Sent2, class _Pred, class _Proj1, class _Proj2>
  _LIBCPP_HIDE_FROM_ABI static constexpr bool __ends_with_fn_impl(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred& __pred,
      _Proj1& __proj1,
      _Proj2& __proj2) {
    if constexpr (std::bidirectional_iterator<_Sent1> && std::bidirectional_iterator<_Sent2> &&
                  (!std::random_access_iterator<_Sent1>) && (!std::random_access_iterator<_Sent2>)) {
      return __ends_with_fn_impl_bidirectional(__first1, __last1, __first2, __last2, __pred, __proj1, __proj2);

    } else {
      auto __n1 = ranges::distance(__first1, __last1);
      auto __n2 = ranges::distance(__first2, __last2);
      if (__n2 == 0)
        return true;
      if (__n2 > __n1)
        return false;

      return __ends_with_fn_impl_with_offset(
          std::move(__first1),
          std::move(__last1),
          std::move(__first2),
          std::move(__last2),
          __pred,
          __proj1,
          __proj2,
          __n1 - __n2);
    }
  }

  template <class _Iter1,
            class _Sent1,
            class _Iter2,
            class _Sent2,
            class _Pred,
            class _Proj1,
            class _Proj2,
            class _Offset>
  static _LIBCPP_HIDE_FROM_ABI constexpr bool __ends_with_fn_impl_with_offset(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred& __pred,
      _Proj1& __proj1,
      _Proj2& __proj2,
      _Offset __offset) {
    if constexpr (std::bidirectional_iterator<_Sent1> && std::bidirectional_iterator<_Sent2> &&
                  !std::random_access_iterator<_Sent1> && !std::random_access_iterator<_Sent2>) {
      return __ends_with_fn_impl_bidirectional(
          std::move(__first1), std::move(__last1), std::move(__first2), std::move(__last2), __pred, __proj1, __proj2);

    } else {
      ranges::advance(__first1, __offset);
      return ranges::equal(
          std::move(__first1),
          std::move(__last1),
          std::move(__first2),
          std::move(__last2),
          std::ref(__pred),
          std::ref(__proj1),
          std::ref(__proj2));
    }
  }

  template <input_iterator _Iter1,
            sentinel_for<_Iter1> _Sent1,
            input_iterator _Iter2,
            sentinel_for<_Iter2> _Sent2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires(forward_iterator<_Iter1> || sized_sentinel_for<_Sent1, _Iter1>) &&
            (forward_iterator<_Iter2> || sized_sentinel_for<_Sent2, _Iter2>) &&
            indirectly_comparable<_Iter1, _Iter2, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr bool operator()(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred __pred   = {},
      _Proj1 __proj1 = {},
      _Proj2 __proj2 = {}) const {
    return __ends_with_fn_impl(
        std::move(__first1), std::move(__last1), std::move(__first2), std::move(__last2), __pred, __proj1, __proj2);
  }

  template <input_range _Range1,
            input_range _Range2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires(forward_range<_Range1> || sized_range<_Range1>) && (forward_range<_Range2> || sized_range<_Range2>) &&
            indirectly_comparable<iterator_t<_Range1>, iterator_t<_Range2>, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr bool operator()(
      _Range1&& __range1, _Range2&& __range2, _Pred __pred = {}, _Proj1 __proj1 = {}, _Proj2 __proj2 = {}) const {
    if constexpr (sized_range<_Range1> && sized_range<_Range2>) {
      auto __n1 = ranges::size(__range1);
      auto __n2 = ranges::size(__range2);
      if (__n2 == 0)
        return true;
      if (__n2 > __n1)
        return false;
      auto __offset = __n1 - __n2;

      return __ends_with_fn_impl_with_offset(
          ranges::begin(__range1),
          ranges::end(__range1),
          ranges::begin(__range2),
          ranges::end(__range2),
          __pred,
          __proj1,
          __proj2,
          __offset);

    } else {
      return __ends_with_fn_impl(
          ranges::begin(__range1),
          ranges::end(__range1),
          ranges::begin(__range2),
          ranges::end(__range2),
          __pred,
          __proj1,
          __proj2);
    }
  }
};

inline namespace __cpo {
inline constexpr auto ends_with = __ends_with{};
} // namespace __cpo
} // namespace ranges

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_STD_VER >= 23

_LIBCPP_POP_MACROS

#endif // _LIBCPP___ALGORITHM_RANGES_ENDS_WITH_H
`,"__algorithm/ranges_find_last.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___ALGORITHM_RANGES_FIND_LAST_H
#define _LIBCPP___ALGORITHM_RANGES_FIND_LAST_H

#include <__config>
#include <__functional/identity.h>
#include <__functional/invoke.h>
#include <__functional/ranges_operations.h>
#include <__iterator/concepts.h>
#include <__iterator/indirectly_comparable.h>
#include <__iterator/next.h>
#include <__iterator/prev.h>
#include <__iterator/projected.h>
#include <__ranges/access.h>
#include <__ranges/concepts.h>
#include <__ranges/subrange.h>
#include <__utility/forward.h>
#include <__utility/move.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_PUSH_MACROS
#include <__undef_macros>

#if _LIBCPP_STD_VER >= 23

_LIBCPP_BEGIN_NAMESPACE_STD

namespace ranges {

template <class _Iter, class _Sent, class _Pred, class _Proj>
_LIBCPP_HIDE_FROM_ABI constexpr subrange<_Iter>
__find_last_impl(_Iter __first, _Sent __last, _Pred __pred, _Proj& __proj) {
  if (__first == __last) {
    return subrange<_Iter>(__first, __first);
  }

  if constexpr (bidirectional_iterator<_Iter>) {
    auto __last_it = ranges::next(__first, __last);
    for (auto __it = ranges::prev(__last_it); __it != __first; --__it) {
      if (__pred(std::invoke(__proj, *__it))) {
        return subrange<_Iter>(std::move(__it), std::move(__last_it));
      }
    }
    if (__pred(std::invoke(__proj, *__first))) {
      return subrange<_Iter>(std::move(__first), std::move(__last_it));
    }
    return subrange<_Iter>(__last_it, __last_it);
  } else {
    bool __found = false;
    _Iter __found_it;
    for (; __first != __last; ++__first) {
      if (__pred(std::invoke(__proj, *__first))) {
        __found    = true;
        __found_it = __first;
      }
    }

    if (__found) {
      return subrange<_Iter>(std::move(__found_it), std::move(__first));
    } else {
      return subrange<_Iter>(__first, __first);
    }
  }
}

struct __find_last {
  template <class _Type>
  struct __op {
    const _Type& __value;
    template <class _Elem>
    _LIBCPP_HIDE_FROM_ABI constexpr decltype(auto) operator()(_Elem&& __elem) const {
      return std::forward<_Elem>(__elem) == __value;
    }
  };

  template <forward_iterator _Iter, sentinel_for<_Iter> _Sent, class _Type, class _Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<_Iter, _Proj>, const _Type*>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static subrange<_Iter>
  operator()(_Iter __first, _Sent __last, const _Type& __value, _Proj __proj = {}) {
    return ranges::__find_last_impl(std::move(__first), std::move(__last), __op<_Type>{__value}, __proj);
  }

  template <forward_range _Range, class _Type, class _Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<_Range>, _Proj>, const _Type*>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static borrowed_subrange_t<_Range>
  operator()(_Range&& __range, const _Type& __value, _Proj __proj = {}) {
    return ranges::__find_last_impl(ranges::begin(__range), ranges::end(__range), __op<_Type>{__value}, __proj);
  }
};

struct __find_last_if {
  template <class _Pred>
  struct __op {
    _Pred& __pred;
    template <class _Elem>
    _LIBCPP_HIDE_FROM_ABI constexpr decltype(auto) operator()(_Elem&& __elem) const {
      return std::invoke(__pred, std::forward<_Elem>(__elem));
    }
  };

  template <forward_iterator _Iter,
            sentinel_for<_Iter> _Sent,
            class _Proj = identity,
            indirect_unary_predicate<projected<_Iter, _Proj>> _Pred>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static subrange<_Iter>
  operator()(_Iter __first, _Sent __last, _Pred __pred, _Proj __proj = {}) {
    return ranges::__find_last_impl(std::move(__first), std::move(__last), __op<_Pred>{__pred}, __proj);
  }

  template <forward_range _Range,
            class _Proj = identity,
            indirect_unary_predicate<projected<iterator_t<_Range>, _Proj>> _Pred>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static borrowed_subrange_t<_Range>
  operator()(_Range&& __range, _Pred __pred, _Proj __proj = {}) {
    return ranges::__find_last_impl(ranges::begin(__range), ranges::end(__range), __op<_Pred>{__pred}, __proj);
  }
};

struct __find_last_if_not {
  template <class _Pred>
  struct __op {
    _Pred& __pred;
    template <class _Elem>
    _LIBCPP_HIDE_FROM_ABI constexpr decltype(auto) operator()(_Elem&& __elem) const {
      return !std::invoke(__pred, std::forward<_Elem>(__elem));
    }
  };

  template <forward_iterator _Iter,
            sentinel_for<_Iter> _Sent,
            class _Proj = identity,
            indirect_unary_predicate<projected<_Iter, _Proj>> _Pred>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static subrange<_Iter>
  operator()(_Iter __first, _Sent __last, _Pred __pred, _Proj __proj = {}) {
    return ranges::__find_last_impl(std::move(__first), std::move(__last), __op<_Pred>{__pred}, __proj);
  }

  template <forward_range _Range,
            class _Proj = identity,
            indirect_unary_predicate<projected<iterator_t<_Range>, _Proj>> _Pred>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI constexpr static borrowed_subrange_t<_Range>
  operator()(_Range&& __range, _Pred __pred, _Proj __proj = {}) {
    return ranges::__find_last_impl(ranges::begin(__range), ranges::end(__range), __op<_Pred>{__pred}, __proj);
  }
};

inline namespace __cpo {
inline constexpr auto find_last        = __find_last{};
inline constexpr auto find_last_if     = __find_last_if{};
inline constexpr auto find_last_if_not = __find_last_if_not{};
} // namespace __cpo
} // namespace ranges

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_STD_VER >= 23

_LIBCPP_POP_MACROS

#endif // _LIBCPP___ALGORITHM_RANGES_FIND_LAST_H
`,"__algorithm/ranges_fold.h":`// -*- C++ -*-
//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___ALGORITHM_RANGES_FOLD_H
#define _LIBCPP___ALGORITHM_RANGES_FOLD_H

#include <__concepts/assignable.h>
#include <__concepts/constructible.h>
#include <__concepts/convertible_to.h>
#include <__concepts/invocable.h>
#include <__concepts/movable.h>
#include <__config>
#include <__functional/invoke.h>
#include <__functional/reference_wrapper.h>
#include <__iterator/concepts.h>
#include <__iterator/iterator_traits.h>
#include <__iterator/next.h>
#include <__ranges/access.h>
#include <__ranges/concepts.h>
#include <__ranges/dangling.h>
#include <__type_traits/decay.h>
#include <__type_traits/invoke.h>
#include <__utility/forward.h>
#include <__utility/move.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_PUSH_MACROS
#include <__undef_macros>

_LIBCPP_BEGIN_NAMESPACE_STD

#if _LIBCPP_STD_VER >= 23

namespace ranges {
template <class _Ip, class _Tp>
struct in_value_result {
  _LIBCPP_NO_UNIQUE_ADDRESS _Ip in;
  _LIBCPP_NO_UNIQUE_ADDRESS _Tp value;

  template <class _I2, class _T2>
    requires convertible_to<const _Ip&, _I2> && convertible_to<const _Tp&, _T2>
  _LIBCPP_HIDE_FROM_ABI constexpr operator in_value_result<_I2, _T2>() const& {
    return {in, value};
  }

  template <class _I2, class _T2>
    requires convertible_to<_Ip, _I2> && convertible_to<_Tp, _T2>
  _LIBCPP_HIDE_FROM_ABI constexpr operator in_value_result<_I2, _T2>() && {
    return {std::move(in), std::move(value)};
  }
};

template <class _Ip, class _Tp>
using fold_left_with_iter_result = in_value_result<_Ip, _Tp>;

template <class _Fp, class _Tp, class _Ip, class _Rp, class _Up = decay_t<_Rp>>
concept __indirectly_binary_left_foldable_impl =
    convertible_to<_Rp, _Up> &&                    //
    movable<_Tp> &&                                //
    movable<_Up> &&                                //
    convertible_to<_Tp, _Up> &&                    //
    invocable<_Fp&, _Up, iter_reference_t<_Ip>> && //
    assignable_from<_Up&, invoke_result_t<_Fp&, _Up, iter_reference_t<_Ip>>>;

template <class _Fp, class _Tp, class _Ip>
concept __indirectly_binary_left_foldable =
    copy_constructible<_Fp> &&                     //
    invocable<_Fp&, _Tp, iter_reference_t<_Ip>> && //
    __indirectly_binary_left_foldable_impl<_Fp, _Tp, _Ip, invoke_result_t<_Fp&, _Tp, iter_reference_t<_Ip>>>;

struct __fold_left_with_iter {
  template <input_iterator _Ip, sentinel_for<_Ip> _Sp, class _Tp, __indirectly_binary_left_foldable<_Tp, _Ip> _Fp>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr auto operator()(_Ip __first, _Sp __last, _Tp __init, _Fp __f) {
    using _Up = decay_t<invoke_result_t<_Fp&, _Tp, iter_reference_t<_Ip>>>;

    if (__first == __last) {
      return fold_left_with_iter_result<_Ip, _Up>{std::move(__first), _Up(std::move(__init))};
    }

    _Up __result = std::invoke(__f, std::move(__init), *__first);
    for (++__first; __first != __last; ++__first) {
      __result = std::invoke(__f, std::move(__result), *__first);
    }

    return fold_left_with_iter_result<_Ip, _Up>{std::move(__first), std::move(__result)};
  }

  template <input_range _Rp, class _Tp, __indirectly_binary_left_foldable<_Tp, iterator_t<_Rp>> _Fp>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr auto operator()(_Rp&& __r, _Tp __init, _Fp __f) {
    auto __result = operator()(ranges::begin(__r), ranges::end(__r), std::move(__init), std::ref(__f));

    using _Up = decay_t<invoke_result_t<_Fp&, _Tp, range_reference_t<_Rp>>>;
    return fold_left_with_iter_result<borrowed_iterator_t<_Rp>, _Up>{std::move(__result.in), std::move(__result.value)};
  }
};

inline constexpr auto fold_left_with_iter = __fold_left_with_iter();

struct __fold_left {
  template <input_iterator _Ip, sentinel_for<_Ip> _Sp, class _Tp, __indirectly_binary_left_foldable<_Tp, _Ip> _Fp>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr auto operator()(_Ip __first, _Sp __last, _Tp __init, _Fp __f) {
    return fold_left_with_iter(std::move(__first), std::move(__last), std::move(__init), std::ref(__f)).value;
  }

  template <input_range _Rp, class _Tp, __indirectly_binary_left_foldable<_Tp, iterator_t<_Rp>> _Fp>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr auto operator()(_Rp&& __r, _Tp __init, _Fp __f) {
    return fold_left_with_iter(ranges::begin(__r), ranges::end(__r), std::move(__init), std::ref(__f)).value;
  }
};

inline constexpr auto fold_left = __fold_left();
} // namespace ranges

#endif // _LIBCPP_STD_VER >= 23

_LIBCPP_END_NAMESPACE_STD

_LIBCPP_POP_MACROS

#endif // _LIBCPP___ALGORITHM_RANGES_FOLD_H
`,"__algorithm/ranges_starts_with.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___ALGORITHM_RANGES_STARTS_WITH_H
#define _LIBCPP___ALGORITHM_RANGES_STARTS_WITH_H

#include <__algorithm/in_in_result.h>
#include <__algorithm/ranges_mismatch.h>
#include <__config>
#include <__functional/identity.h>
#include <__functional/ranges_operations.h>
#include <__iterator/concepts.h>
#include <__iterator/indirectly_comparable.h>
#include <__ranges/access.h>
#include <__ranges/concepts.h>
#include <__utility/move.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_PUSH_MACROS
#include <__undef_macros>

#if _LIBCPP_STD_VER >= 23

_LIBCPP_BEGIN_NAMESPACE_STD

namespace ranges {
struct __starts_with {
  template <input_iterator _Iter1,
            sentinel_for<_Iter1> _Sent1,
            input_iterator _Iter2,
            sentinel_for<_Iter2> _Sent2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires indirectly_comparable<_Iter1, _Iter2, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr bool operator()(
      _Iter1 __first1,
      _Sent1 __last1,
      _Iter2 __first2,
      _Sent2 __last2,
      _Pred __pred   = {},
      _Proj1 __proj1 = {},
      _Proj2 __proj2 = {}) {
    return __mismatch::__go(
               std::move(__first1),
               std::move(__last1),
               std::move(__first2),
               std::move(__last2),
               __pred,
               __proj1,
               __proj2)
               .in2 == __last2;
  }

  template <input_range _Range1,
            input_range _Range2,
            class _Pred  = ranges::equal_to,
            class _Proj1 = identity,
            class _Proj2 = identity>
    requires indirectly_comparable<iterator_t<_Range1>, iterator_t<_Range2>, _Pred, _Proj1, _Proj2>
  [[nodiscard]] _LIBCPP_HIDE_FROM_ABI static constexpr bool
  operator()(_Range1&& __range1, _Range2&& __range2, _Pred __pred = {}, _Proj1 __proj1 = {}, _Proj2 __proj2 = {}) {
    return __mismatch::__go(
               ranges::begin(__range1),
               ranges::end(__range1),
               ranges::begin(__range2),
               ranges::end(__range2),
               __pred,
               __proj1,
               __proj2)
               .in2 == ranges::end(__range2);
  }
};
inline namespace __cpo {
inline constexpr auto starts_with = __starts_with{};
} // namespace __cpo
} // namespace ranges

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_STD_VER >= 23

_LIBCPP_POP_MACROS

#endif // _LIBCPP___ALGORITHM_RANGES_STARTS_WITH_H
`,"__ostream/print.h":`//===---------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===---------------------------------------------------------------------===//

#ifndef _LIBCPP___OSTREAM_PRINT_H
#define _LIBCPP___OSTREAM_PRINT_H

#include <__config>

#if _LIBCPP_HAS_LOCALIZATION

#  include <__fwd/ostream.h>
#  include <__iterator/ostreambuf_iterator.h>
#  include <__ostream/basic_ostream.h>
#  include <format>
#  include <ios>
#  include <print>
#  include <streambuf>

#  if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#    pragma GCC system_header
#  endif

_LIBCPP_BEGIN_NAMESPACE_STD

#  if _LIBCPP_STD_VER >= 23

template <class = void> // TODO PRINT template or availability markup fires too eagerly (http://llvm.org/PR61563).
_LIBCPP_HIDE_FROM_ABI inline void
__vprint_nonunicode(ostream& __os, string_view __fmt, format_args __args, bool __write_nl) {
  // [ostream.formatted.print]/3
  // Effects: Behaves as a formatted output function
  // ([ostream.formatted.reqmts]) of os, except that:
  // - failure to generate output is reported as specified below, and
  // - any exception thrown by the call to vformat is propagated without regard
  //   to the value of os.exceptions() and without turning on ios_base::badbit
  //   in the error state of os.
  // After constructing a sentry object, the function initializes an automatic
  // variable via
  //   string out = vformat(os.getloc(), fmt, args);

  ostream::sentry __s(__os);
  if (__s) {
    string __o = std::vformat(__os.getloc(), __fmt, __args);
    if (__write_nl)
      __o += '\\n';

#    if _LIBCPP_HAS_EXCEPTIONS
    try {
#    endif // _LIBCPP_HAS_EXCEPTIONS
      if (auto __rdbuf = __os.rdbuf();
          !__rdbuf || __rdbuf->sputn(__o.data(), __o.size()) != static_cast<streamsize>(__o.size()))
        __os.setstate(ios_base::badbit | ios_base::failbit);

#    if _LIBCPP_HAS_EXCEPTIONS
    } catch (...) {
      __os.__set_badbit_and_consider_rethrow();
    }
#    endif // _LIBCPP_HAS_EXCEPTIONS
  }
}

template <class = void> // TODO PRINT template or availability markup fires too eagerly (http://llvm.org/PR61563).
_LIBCPP_HIDE_FROM_ABI inline void vprint_nonunicode(ostream& __os, string_view __fmt, format_args __args) {
  std::__vprint_nonunicode(__os, __fmt, __args, false);
}

// Returns the FILE* associated with the __os.
// Returns a nullptr when no FILE* is associated with __os.
// This function is in the dylib since the type of the buffer associated
// with std::cout, std::cerr, and std::clog is only known in the dylib.
//
// This function implements part of the implementation-defined behavior
// of [ostream.formatted.print]/3
//   If the function is vprint_unicode and os is a stream that refers to
//   a terminal capable of displaying Unicode which is determined in an
//   implementation-defined manner, writes out to the terminal using the
//   native Unicode API;
// Whether the returned FILE* is "a terminal capable of displaying Unicode"
// is determined in the same way as the print(FILE*, ...) overloads.
_LIBCPP_EXPORTED_FROM_ABI FILE* __get_ostream_file(ostream& __os);

#    if _LIBCPP_HAS_UNICODE
template <class = void> // TODO PRINT template or availability markup fires too eagerly (http://llvm.org/PR61563).
_LIBCPP_HIDE_FROM_ABI void __vprint_unicode(ostream& __os, string_view __fmt, format_args __args, bool __write_nl) {
#      if _LIBCPP_AVAILABILITY_HAS_PRINT == 0
  return std::__vprint_nonunicode(__os, __fmt, __args, __write_nl);
#      else
  FILE* __file = std::__get_ostream_file(__os);
  if (!__file || !__print::__is_terminal(__file))
    return std::__vprint_nonunicode(__os, __fmt, __args, __write_nl);

  // [ostream.formatted.print]/3
  //    If the function is vprint_unicode and os is a stream that refers to a
  //    terminal capable of displaying Unicode which is determined in an
  //    implementation-defined manner, writes out to the terminal using the
  //    native Unicode API; if out contains invalid code units, the behavior is
  //    undefined and implementations are encouraged to diagnose it. If the
  //    native Unicode API is used, the function flushes os before writing out.
  //
  // This is the path for the native API, start with flushing.
  __os.flush();

#        if _LIBCPP_HAS_EXCEPTIONS
  try {
#        endif // _LIBCPP_HAS_EXCEPTIONS
    ostream::sentry __s(__os);
    if (__s) {
#        ifndef _LIBCPP_WIN32API
      __print::__vprint_unicode_posix(__file, __fmt, __args, __write_nl, true);
#        elif _LIBCPP_HAS_WIDE_CHARACTERS
    __print::__vprint_unicode_windows(__file, __fmt, __args, __write_nl, true);
#        else
#          error "Windows builds with wchar_t disabled are not supported."
#        endif
    }

#        if _LIBCPP_HAS_EXCEPTIONS
  } catch (...) {
    __os.__set_badbit_and_consider_rethrow();
  }
#        endif // _LIBCPP_HAS_EXCEPTIONS
#      endif   // _LIBCPP_AVAILABILITY_HAS_PRINT
}

template <class = void> // TODO PRINT template or availability markup fires too eagerly (http://llvm.org/PR61563).
_LIBCPP_HIDE_FROM_ABI inline void vprint_unicode(ostream& __os, string_view __fmt, format_args __args) {
  std::__vprint_unicode(__os, __fmt, __args, false);
}
#    endif // _LIBCPP_HAS_UNICODE

template <class... _Args>
_LIBCPP_HIDE_FROM_ABI void print(ostream& __os, format_string<_Args...> __fmt, _Args&&... __args) {
#    if _LIBCPP_HAS_UNICODE
  if constexpr (__print::__use_unicode_execution_charset)
    std::__vprint_unicode(__os, __fmt.get(), std::make_format_args(__args...), false);
  else
    std::__vprint_nonunicode(__os, __fmt.get(), std::make_format_args(__args...), false);
#    else  // _LIBCPP_HAS_UNICODE
  std::__vprint_nonunicode(__os, __fmt.get(), std::make_format_args(__args...), false);
#    endif // _LIBCPP_HAS_UNICODE
}

template <class... _Args>
_LIBCPP_HIDE_FROM_ABI void println(ostream& __os, format_string<_Args...> __fmt, _Args&&... __args) {
#    if _LIBCPP_HAS_UNICODE
  // Note the wording in the Standard is inefficient. The output of
  // std::format is a std::string which is then copied. This solution
  // just appends a newline at the end of the output.
  if constexpr (__print::__use_unicode_execution_charset)
    std::__vprint_unicode(__os, __fmt.get(), std::make_format_args(__args...), true);
  else
    std::__vprint_nonunicode(__os, __fmt.get(), std::make_format_args(__args...), true);
#    else  // _LIBCPP_HAS_UNICODE
  std::__vprint_nonunicode(__os, __fmt.get(), std::make_format_args(__args...), true);
#    endif // _LIBCPP_HAS_UNICODE
}

template <class = void> // TODO PRINT template or availability markup fires too eagerly (http://llvm.org/PR61563).
_LIBCPP_HIDE_FROM_ABI inline void println(ostream& __os) {
  std::print(__os, "\\n");
}

#  endif // _LIBCPP_STD_VER >= 23

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_HAS_LOCALIZATION

#endif // _LIBCPP___OSTREAM_PRINT_H
`,"__type_traits/is_implicit_lifetime.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___TYPE_TRAITS_IS_IMPLICIT_LIFETIME_H
#define _LIBCPP___TYPE_TRAITS_IS_IMPLICIT_LIFETIME_H

#include <__config>
#include <__type_traits/integral_constant.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_BEGIN_NAMESPACE_STD

#if _LIBCPP_STD_VER >= 23
#  if __has_builtin(__builtin_is_implicit_lifetime)

template <class _Tp>
struct _LIBCPP_NO_SPECIALIZATIONS is_implicit_lifetime : bool_constant<__builtin_is_implicit_lifetime(_Tp)> {};

template <class _Tp>
_LIBCPP_NO_SPECIALIZATIONS inline constexpr bool is_implicit_lifetime_v = __builtin_is_implicit_lifetime(_Tp);

#  endif
#endif

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP___TYPE_TRAITS_IS_IMPLICIT_LIFETIME_H
`,"__type_traits/is_within_lifetime.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___TYPE_TRAITS_IS_WITHIN_LIFETIME_H
#define _LIBCPP___TYPE_TRAITS_IS_WITHIN_LIFETIME_H

#include <__config>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_BEGIN_NAMESPACE_STD

#if _LIBCPP_STD_VER >= 26 && __has_builtin(__builtin_is_within_lifetime)
template <class _Tp>
_LIBCPP_HIDE_FROM_ABI consteval bool is_within_lifetime(const _Tp* __p) noexcept {
  return __builtin_is_within_lifetime(__p);
}
#endif

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP___TYPE_TRAITS_IS_WITHIN_LIFETIME_H
`,"__type_traits/reference_converts_from_temporary.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___TYPE_TRAITS_REFERENCE_CONVERTS_FROM_TEMPORARY_H
#define _LIBCPP___TYPE_TRAITS_REFERENCE_CONVERTS_FROM_TEMPORARY_H

#include <__config>
#include <__type_traits/integral_constant.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

_LIBCPP_BEGIN_NAMESPACE_STD

#if _LIBCPP_STD_VER >= 23

template <class _Tp, class _Up>
struct _LIBCPP_NO_SPECIALIZATIONS reference_converts_from_temporary
    : public bool_constant<__reference_converts_from_temporary(_Tp, _Up)> {};

template <class _Tp, class _Up>
_LIBCPP_NO_SPECIALIZATIONS inline constexpr bool reference_converts_from_temporary_v =
    __reference_converts_from_temporary(_Tp, _Up);

#endif

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP___TYPE_TRAITS_REFERENCE_CONVERTS_FROM_TEMPORARY_H
`,"__vector/vector_bool_formatter.h":`//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

#ifndef _LIBCPP___VECTOR_VECTOR_BOOL_FORMATTER_H
#define _LIBCPP___VECTOR_VECTOR_BOOL_FORMATTER_H

#include <__concepts/same_as.h>
#include <__config>
#include <__format/formatter.h>
#include <__format/formatter_bool.h>
#include <__fwd/vector.h>

#if !defined(_LIBCPP_HAS_NO_PRAGMA_SYSTEM_HEADER)
#  pragma GCC system_header
#endif

#if _LIBCPP_STD_VER >= 23

_LIBCPP_BEGIN_NAMESPACE_STD

template <class _Tp, class _CharT>
// Since is-vector-bool-reference is only used once it's inlined here.
  requires same_as<typename _Tp::__container, vector<bool, typename _Tp::__container::allocator_type>>
struct formatter<_Tp, _CharT> {
private:
  formatter<bool, _CharT> __underlying_;

public:
  template <class _ParseContext>
  _LIBCPP_HIDE_FROM_ABI constexpr typename _ParseContext::iterator parse(_ParseContext& __ctx) {
    return __underlying_.parse(__ctx);
  }

  template <class _FormatContext>
  _LIBCPP_HIDE_FROM_ABI typename _FormatContext::iterator format(const _Tp& __ref, _FormatContext& __ctx) const {
    return __underlying_.format(__ref, __ctx);
  }
};

_LIBCPP_END_NAMESPACE_STD

#endif // _LIBCPP_STD_VER >= 23

#endif // _LIBCPP___VECTOR_VECTOR_BOOL_FORMATTER_H
`});async function Ri(t,e){if(e?.name!==Xt.name||e.version!==Xt.version||e.revision!==Xt.revision)return!1;let n="/include/c++/v1/",_=new TextDecoder("utf-8",{fatal:!0}),i=t.readFile(`${n}${Wt.path}`);if(i===null||i.byteLength!==Wt.bytes)return!1;let r=new Uint8Array(await crypto.subtle.digest("SHA-256",Uint8Array.from(i).buffer));if(Array.from(r,d=>d.toString(16).padStart(2,"0")).join("")!==Wt.sha256)return!1;let o=[];for(let[d,l]of Object.entries(Li)){let c=`${n}${d}`,p=t.readFile(c);if(p===null)o.push([c,l]);else if(_.decode(p)!==l)throw new Error(`Clang ${e.version} C++ header differs from its pinned source: ${d}`)}let a=new TextEncoder;for(let[d,l]of o)t.mkdirTree(d.slice(0,d.lastIndexOf("/"))),t.writeFile(d,a.encode(l));return!0}var Ci=0,Fo=new TextEncoder,Go=new TextDecoder,X_=t=>JSON.stringify(t.length>96?t.slice(0,93)+"...":t),at=class{ready;mem=null;hostMem_=null;stdinStr;stdinBytes=new Uint8Array(0);stdin;stdout;trace;instance=null;exports;out=!0;filePaths=new Set;fileOverlays=new Map;directoryPaths=new Set;constructor(e){this.stdin=e.stdin,this.stdout=e.stdout,this.stdinStr=e.stdinStr||"",this.trace=e.trace||(()=>{});let n=Nn(this,"abort","host_write","host_read","memfs_log","copy_in","copy_out");this.ready=(e.maxAssetBytes!==void 0?Bn(e.moduleUrl,e.progress,e.signal,e.maxAssetBytes):e.signal?Bn(e.moduleUrl,e.progress,e.signal):Bn(e.moduleUrl,e.progress)).then(_=>WebAssembly.instantiate(_,{env:n})).then(_=>{this.instance=_,this.exports=_.exports,this.mem=new cn(this.exports.memory),this.exports.init()})}set hostMem(e){this.hostMem_=e}setStdinStr(e){this.stdinStr=e,this.stdinBytes=new Uint8Array(0)}addDirectory(e){let n=this.normalizePath(e);this.directoryPaths.has(n)||(this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e),this.exports.AddDirectoryNode(e.length),this.directoryPaths.add(n))}addFile(e,n){let _=n instanceof ArrayBuffer?n.byteLength:n.length;this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e);let i=this.exports.AddFileNode(e.length,_),r=this.exports.GetFileNodeAddress(i);this.mem.check(),this.mem.write(r,n),this.filePaths.add(this.normalizePath(e))}setFile(e,n){let _=this.normalizePath(e);this.filePaths.add(_),this.fileOverlays.set(_,Uint8Array.from(n))}hasFile(e){return this.filePaths.has(this.normalizePath(e))}normalizePath(e){return e.replaceAll("\\","/").replace(/^\.\//,"").replace(/^\/+/,"")}getFileContents(e){let n=this.fileOverlays.get(this.normalizePath(e));if(n)return n;this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e);let _=this.exports.FindNode(e.length),i=this.exports.GetFileNodeAddress(_),r=this.exports.GetFileNodeSize(_);return new Uint8Array(this.mem.buffer,i,r)}abort(){throw this.trace("abort()"),new hn}host_write(e,n,_,i){this.hostMem_.check(),U_(e<=2);let r=0,s="";for(let o=0;o<_;++o){let a=this.hostMem_.read32(n);n+=4;let d=this.hostMem_.read32(n);n+=4,s+=this.hostMem_.readStrR(a,d),r+=d}return this.hostMem_.write32(i,r),this.trace(`host_write(fd=${e}, bytes=${r}, data=${X_(s)})`),this.out&&this.stdout(s),Ci}host_read(e,n,_,i){this.hostMem_.check(),U_(e===0);let r=0;for(let s=0;s<_;++s){let o=this.hostMem_.read32(n);n+=4;let a=this.hostMem_.read32(n);if(n+=4,!this.stdinBytes.length){let c=this.stdinStr.length?this.stdinStr:this.stdin();this.stdinStr="",this.stdinBytes=Fo.encode(c)}let d=Math.min(a,this.stdinBytes.length);if(d===0)break;let l=this.stdinBytes.subarray(0,d);if(this.hostMem_.write(o,l),this.stdinBytes=this.stdinBytes.slice(d),r+=d,this.trace(`host_read(fd=${e}, bytes=${d}, data=${X_(Go.decode(l))})`),d!==a)break}return this.hostMem_.write32(i,r),r===0&&this.trace(`host_read(fd=${e}, bytes=0)`),Ci}memfs_log(e,n){this.mem.check();let _=this.mem.readStr(e,n);this.trace(`memfs_log(${X_(_)})`)}copy_out(e,n,_){this.hostMem_.check();let i=new Uint8Array(this.hostMem_.buffer,e,_);this.mem.check();let r=new Uint8Array(this.mem.buffer,n,_);i.set(r)}copy_in(e,n,_){this.mem.check();let i=new Uint8Array(this.mem.buffer,e,_);this.hostMem_.check();let r=new Uint8Array(this.hostMem_.buffer,n,_);i.set(r)}};function*Ho(t){let e=t instanceof Uint8Array?t:new Uint8Array(t),n=0,_="",i=o=>(n+=o,bn(e,n-o,o)),r=o=>(n+=o,pr(e,n-o,o)),s=()=>n=n+511&-512;for(;n+512<=e.length;){let o={filename:i(100),mode:r(8),owner:r(8),group:r(8),size:r(12),mtime:r(12),checksum:r(8),type:i(1),linkname:i(100),ustar:i(8)};if(!o.ustar)return;let a={...o,ownerName:i(32),groupName:i(32),devMajor:i(8),devMinor:i(8),filenamePrefix:i(155)};if(s(),a.size>0||a.type==="0"||a.type===""||a.type==="L"){let d=e.subarray(n,n+a.size);a.contents=d,n+=a.size,s()}if(a.type==="L"){a.contents&&(_=bn(a.contents,0,a.size));continue}a.filename=_||(a.filenamePrefix?`${a.filenamePrefix}/${a.filename}`:a.filename),_="",yield a}}function $t(t,e){for(let n of Ho(t))switch(n.type){case"":case"0":e.addFile(n.filename,n.contents);break;case"5":e.addDirectory(n.filename);break;default:throw new Error(`unsupported tar entry type: ${n.type}`)}}var W_="\x1B[92m",Vt="\x1B[0m",vi="\x1B[1;93m";var Bo=t=>Math.max(0,Math.min(1,Number.isFinite(t)?t:0));function Mi(t){let e={clang:0,lld:0,memfs:0},n=()=>{t((e.clang+e.memfs)/2)},_=i=>({set(r){e[i]=Bo(r),n()}});return{clang:_("clang"),lld:_("lld"),memfs:_("memfs")}}var $_=(t,e)=>{let n=t?.toString().trim();if(!n)throw new Error(`${e} is required`);let _;try{_=new URL(n,typeof location<"u"?location.href:void 0)}catch{throw new Error(`${e} must be an absolute HTTP(S) URL`)}if(_.protocol!=="http:"&&_.protocol!=="https:")throw new Error(`${e} must use HTTP(S)`);return _},Di=t=>{let e=$_(t,"wasm-clang runtime base URL");return e.pathname.endsWith("/")||(e.pathname+="/"),e.hash="",e},Xe=(t,e)=>new URL(e,Di(t)).toString(),ko=(t,e)=>Xe(t,e),kn=t=>Di(t).toString();var jt=t=>ko(t,"runtime-manifest.v1.json");function Pi(t,e){let n=kn(t),_=e?.compiler.sysroot.profiles;if(_&&(typeof _.c?.asset!="string"||!_.c.asset||typeof _.cppAddon?.asset!="string"||!_.cppAddon.asset))throw new TypeError("Clang sysroot profiles require both C and C++ add-on assets");return{manifest:jt(n).toString(),memfs:Xe(n,e?.compiler.memfs.asset||"bin/memfs.wasm.gz").toString(),clang:Xe(n,e?.compiler.clang.asset||"bin/clang.wasm.gz").toString(),lld:Xe(n,e?.compiler.lld.asset||"bin/lld.wasm.gz").toString(),sysroot:Xe(n,e?.compiler.sysroot.asset||"bin/sysroot.tar.gz").toString(),..._?{cSysroot:Xe(n,_.c.asset).toString(),cppAddon:Xe(n,_.cppAddon.asset).toString()}:{},...e?.compiler.sysroot.printscanLongDouble?{printscanLongDouble:Xe(n,e.compiler.sysroot.printscanLongDouble.asset).toString()}:{},clangdJs:Xe(n,e?.clangd.js||"clangd/clangd.js").toString(),clangdWasm:Xe(n,e?.clangd.wasm||"clangd/clangd.wasm.gz").toString()}}var We=t=>t.replaceAll("\\","/").split("/").filter(e=>e&&e!=="."&&e!=="..").join("/"),mn=t=>{let e=We(t);return e.startsWith("workspace/")?e.slice(10):e};function Xn(t,e){let n=We(e||""),_="main",i=n&&/\.[A-Za-z0-9_-]+$/.test(n)?n:`${n||_}.${t==="C"?"c":t==="OBJC"?"m":"cc"}`,r=(i.split("/").pop()||i).replace(/\.[^.]+$/,"")||_;return{input:i,obj:`${r}.o`,wasm:`${r}.wasm`}}async function Oi(t){let e=typeof t=="string"?new TextEncoder().encode(t):t instanceof Uint8Array?new Uint8Array(t):new Uint8Array(t),n=await globalThis.crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n),_=>_.toString(16).padStart(2,"0")).join("")}async function Ui(t,e,n){if(!n)throw new Error("LLDB debug compilation requires compiler provenance in the wasm-clang runtime manifest");let _=t.language||"CPP",i=mn(t.activePath||"")||mn(t.fileName||"")||void 0,{input:r}=Xn(_,i),s=new Map;for(let a of t.workspaceFiles||[]){let d=mn(a.path);d&&s.set(d,a.content)}s.set(r,t.code);let o=[...s.entries()].sort(([a],[d])=>a<d?-1:a>d?1:0);return{kind:"dwarf",sourceRoot:"/workspace",moduleSha256:await Oi(e),files:await Promise.all(o.map(async([a,d])=>({path:`/workspace/${a}`,contentSha256:await Oi(d)}))),compiler:n}}var V_="/include/bits/stdc++.h",Ye="__wasm_idle_build/pch/stdc++.pch",Xo=[/^-[DU][A-Za-z_]/,/^-W/,/^-w$/,/^-f[a-z]/,/^-O([0-3sz]|fast)?$/,/^-std=/,/^-pedantic(-errors)?$/],Fi=/precompiled (header|file)|PCH file|AST file/i;function Gi(t){let e=t.replace(/^\uFEFF/,"");for(;;)if(e=e.replace(/^\s+/,""),e.startsWith("//")){let n=e.indexOf(`
`);if(n<0||e.slice(0,n).trimEnd().endsWith("\\"))return!1;e=e.slice(n+1)}else if(e.startsWith("/*")){let n=e.indexOf("*/",2);if(n<0)return!1;e=e.slice(n+2)}else break;return/^#[ \t]*include[ \t]*<bits\/stdc\+\+\.h>/.test(e)}function Hi(t){return t.every(e=>typeof e=="string"&&e!=="-fsyntax-only"&&Xo.some(n=>n.test(e)))}var Wo="/lib/clang/8.0.1",$o="lib/clang/8.0.1/lib/wasi",nn="__wasm_idle_build",j_="lib/wasm32-wasi/libc-printscan-long-double.a",Vo=/\.(?:c|cc|cpp|cxx)$/,Bi=t=>t.some(e=>typeof e!="string"||e.startsWith("-x")||e.startsWith("@")),jo=new Set(["-target","--target","-triple","-target-feature","-target-cpu","-target-abi","-mcpu","-march","-mattr","-mthread-model","-mllvm","-pthread","-fopenmp","-msimd128","-mno-simd128","-matomics","-mno-atomics","-mmemory64","-mno-memory64","-mshared-memory","-mno-shared-memory","-mmulti-memory","-mno-multi-memory"]),zo=["-target=","--target=","-triple=","-target-feature=","-target-cpu=","-target-abi=","-mcpu=","-march=","-mattr=","-mthread-model=","-mllvm="],ki=t=>{let e=encodeURIComponent(t),n="";for(let _=0;_<e.length;){let i=e[_];if(_+=1,i=="%"){let r=e.substring(_,_+=2);r&&(n+=String.fromCharCode(parseInt(r,16)))}else n+=i}return n};function Yo(t,e){let n=[...t],_=e,i,r=!1;for(let s=0;s<t.length;s+=1){let o=t[s],a=t[s+1];if(_){n[s]=" ",o==="*"&&a==="/"&&(n[s+1]=" ",s+=1,_=!1);continue}if(i){n[s]=" ",r?r=!1:o==="\\"?r=!0:o===i&&(i=void 0);continue}if(o==="/"&&a==="*"){n[s]=" ",n[s+1]=" ",s+=1,_=!0;continue}if(o==="/"&&a==="/"){for(let d=s;d<t.length;d+=1)n[d]=" ";break}(o==='"'||o==="'")&&(n[s]=" ",i=o)}return{line:n.join(""),inBlockComment:_}}var z_=class{ready;memfs;stdout;moduleCache;moduleLoads;showTiming;log;debug=!1;debugBreakpoints=new Set;debugPauseOnEntry=!1;debugBuffer;debugInterruptBuffer;debugWatchBuffer;debugWatchResultBuffer;onDebugEvent;debugVariableMetadata={};debugGlobalMetadata=[];debugFunctionMetadata={};lastBuildKey="";precompiledHeaderPlan;usedPrecompiledHeader=!1;mountedPrecompiledHeaderKey="";path;assetUrls;compilerConfig;wasm;lastArtifactPath="main.wasm";traceStartedAt=0;progress;maxAssetBytes;signal;cppSysrootReady;printscanLongDoubleReady;constructor(e){let n=e.maxAssetBytes??Hn;if(!Number.isSafeInteger(n)||n<=0)throw new TypeError("Clang maxAssetBytes must be a positive safe integer");this.maxAssetBytes=n,this.signal=e.signal,this.moduleCache={},this.moduleLoads={},this.stdout=e.stdout||(()=>{}),this.showTiming=e.showTiming||!1,this.log=e.log||!1,this.path=e.runtimeBaseUrl.toString(),this.assetUrls=Pi(this.path,e.manifest),this.compilerConfig=e.manifest?.compiler,this.onDebugEvent=e.onDebugEvent,this.progress=Mi(a=>e.progress?.(a)),this.memfs=new at({stdout:this.stdout,stdin:e.stdin||(()=>""),moduleUrl:this.assetUrls.memfs,progress:this.progress.memfs,signal:e.signal,maxAssetBytes:n,trace:a=>this.trace(a)});let _=this.getModule(this.assetUrls.clang,this.progress.clang,e.signal),i=this.assetUrls.cSysroot||this.assetUrls.sysroot,r=e.signal?pn(i,void 0,n,e.signal):pn(i,void 0,n),o=Promise.all([this.memfs.ready,r]).then(async([,a])=>{await this.hostLogAsync(`Untarring ${i}`,Promise.resolve().then(()=>(e.signal?.throwIfAborted(),$t(a,this.memfs)))),e.signal?.throwIfAborted(),wi({readFile:d=>this.memfs.hasFile(d)?this.memfs.getFileContents(d.replace(/^\/+/,"")):null,mkdirTree:d=>this.memfs.addDirectory(d.replace(/^\/+/,"")),writeFile:(d,l)=>this.memfs.addFile(d.replace(/^\/+/,""),l)},this.compilerConfig?.provenance,this.compilerConfig?.resourceDir),this.assetUrls.cppAddon||await this.installCppHeaders()});this.ready=Promise.all([_,o]).then(()=>{})}ensureCppSysroot(){let e=this.assetUrls.cppAddon;if(!e)return this.ready;if(this.cppSysrootReady)return this.cppSysrootReady;let n=this.signal?pn(e,void 0,this.maxAssetBytes,this.signal):pn(e,void 0,this.maxAssetBytes),_=Promise.all([this.ready,n]).then(async([,i])=>{await this.hostLogAsync(`Untarring ${e}`,Promise.resolve().then(()=>(this.signal?.throwIfAborted(),$t(i,this.memfs)))),this.signal?.throwIfAborted(),await this.installCppHeaders()});return this.cppSysrootReady=_,n.catch(()=>{this.cppSysrootReady===_&&(this.cppSysrootReady=void 0)}),_}async installCppHeaders(){bi(this.memfs),await Ri({readFile:e=>this.memfs.hasFile(e)?this.memfs.getFileContents(e.replace(/^\/+/,"")):null,mkdirTree:e=>this.memfs.addDirectory(e.replace(/^\/+/,"")),writeFile:(e,n)=>this.memfs.addFile(e.replace(/^\/+/,""),n)},this.compilerConfig?.provenance)}async prepareLongDoubleLinkArgs(){await this.ready;let e=this.assetUrls.printscanLongDouble;if(e&&!this.memfs.hasFile(j_)){if(!this.printscanLongDoubleReady){let n=(this.signal?pn(e,void 0,this.maxAssetBytes,this.signal):pn(e,void 0,this.maxAssetBytes)).then(_=>{this.signal?.throwIfAborted(),this.memfs.addFile(j_,_)});this.printscanLongDoubleReady=n,n.catch(()=>{this.printscanLongDoubleReady===n&&(this.printscanLongDoubleReady=void 0)})}await this.printscanLongDoubleReady}return this.memfs.hasFile(j_)?["-lc-printscan-long-double"]:[]}hostLog(e){if(!this.log)return;let n=`${vi}>${Vt} `;this.stdout(`${n}${e}`)}beginTrace(e){this.debug=e,this.traceStartedAt=Date.now()}trace(e){if(!this.debug||!this.log)return;let n=Date.now()-this.traceStartedAt;this.stdout(`\x1B[2m[debug +${n}ms] ${e}\x1B[0m
`)}async hostLogAsync(e,n){let _=+new Date;this.hostLog(`${e}...`);let i=await n,r=+new Date;return this.log&&this.stdout(" done."),this.showTiming&&this.stdout(` ${W_}(${r-_}ms)${Vt}
`),this.log&&this.stdout(`
`),i}async getModule(e,n,_=this.signal){if(this.moduleCache[e])return this.moduleCache[e];let i=this.moduleLoads[e];if(i)return await i;let r=this.hostLogAsync(`Fetching and compiling ${e}`,Bn(e,n,_,this.maxAssetBytes)).then(s=>(this.moduleCache[e]=s,delete this.moduleLoads[e],s),s=>{throw delete this.moduleLoads[e],s});return this.moduleLoads[e]=r,await r}addWorkspaceDirectories(e,n=new Set){let _=We(e).split("/").slice(0,-1),i="";for(let r of _)i=i?`${i}/${r}`:r,n.has(i)||(this.memfs.addDirectory(i),n.add(i))}addWorkspaceFiles(e=[],n=""){let _=new Set,i=We(n);for(let r of e){let s=We(r.path);!s||s===i||(this.addWorkspaceDirectories(s,_),this.memfs.addFile(s,ki(r.content)))}}async compile(e){let n=We(e.input||"main.cc")||"main.cc",_=e.code,i=e.obj,r=e.language==="C"?"C":e.language==="OBJC"?"OBJC":"CPP",s=e.compileArgs??e.args??[],{languageArg:o,standardArg:a}=Ei(r,e),d=sn(e),l=d==="trace",c=d==="lldb";if(c)for(let h of s){if(typeof h!="string")throw new TypeError("LLDB compile arguments must be strings");if(jo.has(h)||zo.some(y=>h.startsWith(y)))throw new Error(`LLDB compile argument ${JSON.stringify(h)} cannot change the WAMR debug target profile`)}let p=d==="none"?e.opt||"2":"0";if(l){let h=_.split(`
`),y=!1,S=h.map(C=>{let O=Yo(C,y);return y=O.inBlockComment,O.line}),N=C=>{if(/^(?:do|else)$/.test(C))return!0;if(!/^(?:else\s+)?(?:if|for|while)\s*\(/.test(C))return!1;let O=C.indexOf("("),V=0;for(let re=O;re<C.length;re+=1)if(C[re]==="("&&(V+=1),C[re]===")"&&(V-=1,V===0))return C.slice(re+1).trim()==="";return!1},x=new Set,M=!1,W=!1;for(let C=0;C<S.length;C+=1){let O=S[C].trim();if(!O)continue;let V=W,re=V;V&&O.includes(";")&&(W=!1),M&&(M=!1,O!=="{"&&(re=!0,!O.includes(";")&&!O.includes("{")&&!N(O)&&(W=!0))),/^while\s*\(.*\)\s*;$/.test(O)&&(re=!0),re&&x.add(C),N(O)&&(M=!0)}let Y=0,k=0,L=0,B=1,D=1,$=new Map,P=new Map,G=new Map,K,me=new Map,ae="",de=[],ne=!1;for(let C of h){let O=C;if(ne){let le=O.indexOf("*/");if(le===-1)continue;O=O.slice(le+2),ne=!1}let V=O.indexOf("/*");if(V!==-1){let le=O.indexOf("*/",V+2);le===-1?(ne=!0,O=O.slice(0,V)):O=O.slice(0,V)+O.slice(le+2)}let re=O.indexOf("//");re!==-1&&(O=O.slice(0,re));let ve=O.trim();if(!ae){let le=ve.match(/^struct\s+([A-Za-z_]\w*)\s*\{$/);le?.[1]&&(ae=le[1],de=[]);continue}if(ve==="};"){let le=0,De=1,_n=[];for(let Ze of de){let Ve=Ze.kind==="double"?8:Ze.kind==="bool"||Ze.kind==="char"?1:4;le%Ve!==0&&(le+=Ve-le%Ve),_n.push({name:Ze.name,kind:Ze.kind,offset:le}),le+=Ve,De=Math.max(De,Ve)}le%De!==0&&(le+=De-le%De),me.set(ae,{fields:_n,size:Math.max(le,1)}),ae="",de=[];continue}let w=ve.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/);if(w)for(let le of w[2].split(",")){let De=le.split("=")[0]?.trim()||"";if(!De||/[*&\[]/.test(De))continue;let _n=De.match(/([A-Za-z_]\w*)\s*$/)?.[1];_n&&de.push({name:_n,kind:w[1]})}}this.debugVariableMetadata={},this.debugGlobalMetadata=[],this.debugFunctionMetadata={};let ge=[],he=r==="CPP"?'extern "C" ':"",ke=[`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_enter"))) void __wasm_idle_debug_enter(int functionId, int line);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_leave"))) void __wasm_idle_debug_leave(int functionId);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_num"))) void __wasm_idle_debug_value_num(int functionId, int slot, double value);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_bool"))) void __wasm_idle_debug_value_bool(int functionId, int slot, int value);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_addr"))) void __wasm_idle_debug_value_addr(int functionId, int slot, int value);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_text"))) void __wasm_idle_debug_value_text(int functionId, int slot, const char* ptr, int len);`,`${he}__attribute__((import_module("env"), import_name("__wasm_idle_debug_line"))) void __wasm_idle_debug_line(int functionId, int line);`],_e=r==="CPP"?["#include <cstdio>","#include <iostream>","#include <map>","#include <set>","#include <string>","#include <type_traits>","#include <vector>",...ke,"template <typename T>","static inline std::string __wasm_idle_debug_format_value(const T& value) {",'    if constexpr (std::is_same_v<T, bool>) return value ? "true" : "false";',`    else if constexpr (std::is_same_v<T, char>) return std::string("'") + value + "'";`,"    else if constexpr (std::is_same_v<T, signed char> || std::is_same_v<T, unsigned char>) return std::to_string((int)value);","    else if constexpr (std::is_integral_v<T> || std::is_floating_point_v<T>) return std::to_string(value);",'    else return "?";',"}","template <typename T>","static inline void __wasm_idle_debug_emit_vector(int functionId, int slot, const std::vector<T>& values) {",'    std::string text = "[";',"    int count = 0;","    for (const auto& value : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(value);","        count += 1;","    }",'    text += "]";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}","template <typename T>","static inline void __wasm_idle_debug_emit_set(int functionId, int slot, const std::set<T>& values) {",'    std::string text = "{";',"    int count = 0;","    for (const auto& value : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(value);","        count += 1;","    }",'    text += "}";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}","template <typename K, typename V>","static inline void __wasm_idle_debug_emit_map(int functionId, int slot, const std::map<K, V>& values) {",'    std::string text = "{";',"    int count = 0;","    for (const auto& entry : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(entry.first);",'        text += ": ";',"        text += __wasm_idle_debug_format_value(entry.second);","        count += 1;","    }",'    text += "}";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}"]:["#include <stdio.h>",...ke];for(let C=0;C<h.length;C+=1){let O=h[C],V=O.match(/^\s*/)?.[0]||"",re=O,ve=S[C],w=ve.trim(),le=x.has(C),De=k>0&&Y>=k,_n=k===0&&Y===0&&!w.includes("(")&&!w.startsWith("#"),Ze=/^(while|if|for)\s*\(/.test(w)&&!w.includes("{"),Ve=[],rn=[],or=new Set,d_=_n&&w.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/);if(d_){let ce=d_[1]==="bool"?"bool":"number",Ie=[],xe="",X=0;for(let F of d_[2]){if(F===","&&X===0){xe.trim()&&Ie.push(xe.trim()),xe="";continue}F==="{"&&(X+=1),F==="}"&&(X=Math.max(0,X-1)),xe+=F}xe.trim()&&Ie.push(xe.trim());for(let F of Ie){let[j]=F.split("="),ie=j?.trim()||"";if(/[*&\[]/.test(ie))continue;let q=ie.match(/([A-Za-z_]\w*)\s*$/)?.[1];if(!q)continue;let te=D++;P.set(q,{slot:te,kind:ce,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugGlobalMetadata=[...this.debugGlobalMetadata,{slot:te,name:q,kind:ce,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],ge.push(`${ce==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${te}, ${q});`)}}let yn=_n&&w.match(/^(?:const\s+)?([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*\[(\d+)\]\s*(?:=.*)?;$/);if(yn){let ce=me.get(yn[1]);if(ce){let Ie=D++;this.debugGlobalMetadata=[...this.debugGlobalMetadata,{slot:Ie,name:yn[2],kind:"array",length:Number(yn[3]),dimensions:[Number(yn[3])],structFields:ce.fields,structSize:ce.size,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],ge.push(`__wasm_idle_debug_value_addr(0, ${Ie}, (int)((unsigned long long)(${yn[2]})));`)}}if(De&&!le&&w&&!w.startsWith("#")&&w!=="{"&&w!=="}"&&!w.startsWith("else")&&!w.startsWith("case ")&&w!=="case"&&!w.startsWith("default")&&!w.startsWith("catch")&&!/^(public|private|protected)\s*:/.test(w)&&!w.endsWith(":")&&!w.includes(" else ")){Ve.push(`${V}__wasm_idle_debug_line(${L}, ${C+1});`);let ce=w.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/),Ie=w.match(/^(?:const\s+)?(?:(?:std::)?(vector|set|map))\s*<(.+)>\s+([A-Za-z_]\w*)\s*(?:=.*)?;$/);if(Ie&&L){let X=D++,F=Ie[1],j=Ie[3];or.add(j),G.set(j,{slot:X,container:F,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:X,name:j,kind:"text",fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],rn.push(`${V}__wasm_idle_debug_emit_${F}(${L}, ${X}, ${j});`)}if(ce&&L){let X=ce[1]==="bool"?"bool":"number",F=[],j="",ie=0,q=0;for(let te of ce[2]){if(te===","&&ie===0&&q===0){j.trim()&&F.push(j.trim()),j="";continue}te==="("&&(ie+=1),te===")"&&(ie=Math.max(0,ie-1)),te==="{"&&(q+=1),te==="}"&&(q=Math.max(0,q-1)),j+=te}j.trim()&&F.push(j.trim());for(let te of F){let[ue]=te.split("="),ee=ue?.trim()||"",Se=[];for(let Te of ee.matchAll(/\[(\d+)\]/g))Se.push(Number(Te[1]));let Ae=ee.match(/([A-Za-z_]\w*)\s*(?=\[\d+\])/);if(Se.length&&Ae){let Te=D++;this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:Te,name:Ae[1],kind:"array",elementKind:ce[1],length:Se[0],dimensions:Se,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],rn.push(`${V}__wasm_idle_debug_value_addr(${L}, ${Te}, (int)((unsigned long long)(${Ae[1]})));`);continue}if(/[*&]/.test(ee))continue;let Me=ee.match(/([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?$/)?.[1];if(Me){if(!$.has(Me)){let Te=D++;$.set(Me,{slot:Te,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:Te,name:Me,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}]}if(te.includes("=")){let Te=$.get(Me);Te&&rn.push(`${V}${Te.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${Te.slot}, ${Me});`)}}}}let xe=w.match(/^for\s*\(\s*(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+([A-Za-z_]\w*)\s*=/);if(xe&&L){let X=xe[1]==="bool"?"bool":"number",F=xe[2];if(!$.has(F)){let j=D++;$.set(F,{slot:j,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:j,name:F,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}]}}if(!Ze){for(let[X,F]of G){if(or.has(X))continue;let j=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`\\b${j}\\b`).test(w)&&rn.push(`${V}__wasm_idle_debug_emit_${F.container}(${L}, ${F.slot}, ${X});`)}for(let[X,F]of $){let j=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");w.startsWith("for")&&F.toLine===C+1||(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${j}\\b`).test(w)||new RegExp(`\\b${j}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${j}\\b`).test(w)||new RegExp(`\\b(?:cin|std::cin)\\b[^;]*>>\\s*${j}\\b`).test(w))&&rn.push(`${V}${F.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${F.slot}, ${X});`)}for(let[X,F]of P){if($.has(X)||G.has(X))continue;let j=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${j}\\b`).test(w)||new RegExp(`\\b${j}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${j}\\b`).test(w)||new RegExp(`\\b(?:cin|std::cin)\\b[^;]*>>\\s*${j}\\b`).test(w))&&rn.push(`${V}${F.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${F.slot}, ${X});`)}}/^return\b/.test(w)&&Ve.push(`${V}__wasm_idle_debug_leave(${L});`)}if(k>0&&Y===k&&w==="}"&&Ve.push(`${V}__wasm_idle_debug_leave(${L});`),De&&L&&(/^(while|if)\s*\(/.test(w)||/^for\s*\(/.test(w))){let Ie=w.match(/^(while|if|for)\b/)?.[1],xe=O.indexOf(Ie||""),X=xe>=0?O.indexOf("(",xe):-1;if(X>=0){let F=-1,j=0;for(let ie=X;ie<O.length;ie+=1){let q=O[ie];if(q==="("&&(j+=1),q===")"&&(j-=1,j===0)){F=ie;break}for(let[te,ue]of P){if($.has(te)||G.has(te))continue;let ee=te.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");!Ze&&(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${ee}\\b`).test(w)||new RegExp(`\\b${ee}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${ee}\\b`).test(w))&&rn.push(`${V}${ue.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${ue.slot}, ${te});`)}}if(F>X){let ie=O.slice(X+1,F);if(Ie==="for"){let q=[],te="",ue=0;for(let ee of ie){if(ee===";"&&ue===0){q.push(te),te="";continue}ee==="("&&(ue+=1),ee===")"&&(ue=Math.max(0,ue-1)),te+=ee}if(q.push(te),q.length===3&&q[1]?.trim()){let ee=q[0].trim(),Se=q[2].trim(),Ae=[],Me=[],Te=[],ar=/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(?:int|float|double|bool|char)\b/.test(ee);for(let[yt,En]of $){let dr=yt.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l_=new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${dr}\\b|\\b${dr}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`);!ar&&l_.test(ee)&&Ae.push(`${En.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${En.slot}, ${yt})`),ar&&l_.test(ee)&&Me.push(`${En.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${En.slot}, ${yt})`),l_.test(Se)&&Te.push(`${En.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${En.slot}, ${yt})`)}let Ns=Ae.length&&ee?`(${ee}, ${Ae.join(", ")})`:q[0],bs=Te.length&&Se?`(${Se}, ${Te.join(", ")})`:q[2];re=O.slice(0,X+1)+`${Ns}; (${Me.length?`${Me.join(", ")}, `:""}__wasm_idle_debug_line(${L}, ${C+1}), (${q[1].trim()})); ${bs}`+O.slice(F)}}else{let q=[];if(Ze){for(let[ue,ee]of $){let Se=ue.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${Se}\\b|\\b${Se}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(ie)&&q.push(`${ee.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${ee.slot}, ${ue})`)}for(let[ue,ee]of P){if($.has(ue)||G.has(ue))continue;let Se=ue.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${Se}\\b|\\b${Se}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(ie)&&q.push(`${ee.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${ee.slot}, ${ue})`)}}let te=q.length?`((${ie.trim()}) ? (${q.join(", ")}, 1) : (${q.join(", ")}, 0))`:`(${ie.trim()})`;re=O.slice(0,X+1)+`(__wasm_idle_debug_line(${L}, ${C+1}), ${te})`+O.slice(F)}}}}_e.push(...Ve),_e.push(re),_e.push(...rn);let At=k===0&&w.includes("(")&&w.includes(")")&&w.includes("{")&&(ve.match(/{/g)||[]).length>(ve.match(/}/g)||[]).length&&!/^(if|for|while|switch|catch)\b/.test(w)&&!/^(class|struct|namespace|enum|union)\b/.test(w),Es=k===0&&!!K&&w==="{";if(Y+=(ve.match(/{/g)||[]).length,Y-=(ve.match(/}/g)||[]).length,At||Es){k=Y,L=B++;let ce="anonymous",Ie=r==="OBJC"&&At?w.match(/^([-+])\s*\([^)]*\)\s*([A-Za-z_]\w*)/):null;if(At?(ce=w.slice(0,w.indexOf("(")).trim().split(/\s+/).pop()||ce,Ie&&(ce=`${Ie[1]}${Ie[2]}`)):K&&(ce=K.functionName||ce),this.debugFunctionMetadata[L]=ce,D=1,$=new Map,G=new Map,_e.push(`${V}    __wasm_idle_debug_enter(${L}, ${C+1});`),ce==="main"){r==="CPP"&&(_e.push(`${V}    std::cout.setf(std::ios::unitbuf);`),_e.push(`${V}    std::cerr.setf(std::ios::unitbuf);`));let X=r==="CPP"?"nullptr":"NULL";_e.push(`${V}    setvbuf(stdout, ${X}, _IONBF, 0);`),_e.push(`${V}    setvbuf(stderr, ${X}, _IONBF, 0);`)}let xe=At?Ie?"":w.slice(w.indexOf("(")+1,w.lastIndexOf(")")):K?.parameters||"";for(let X of xe.split(",").map(F=>F.trim()).filter(Boolean)){let F=X.split("=")[0]?.trim()||"",j=F.match(/^(?:const\s+)?(?:(?:std::)?(vector|set|map)\s*<.+>)\s*&?\s*([A-Za-z_]\w*)\s*$/);if(j){let Ae=D++,Me=j[1],Te=j[2];G.set(Te,{slot:Ae,container:Me,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:Ae,name:Te,kind:"text",fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],_e.push(`${V}    __wasm_idle_debug_emit_${Me}(${L}, ${Ae}, ${Te});`);continue}let ie=[];for(let Ae of F.matchAll(/\[(\d+)\]/g))ie.push(Number(Ae[1]));let q=F.match(/([A-Za-z_]\w*)\s*(?=\[\d+\])/);if(ie.length&&q&&/\b(int|float|double|bool|char)\b/.test(F)){let Ae=D++;this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:Ae,name:q[1],kind:"array",elementKind:F.match(/\b(int|float|double|bool|char)\b/)?.[1]||"int",length:ie[0],dimensions:ie,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],_e.push(`${V}    __wasm_idle_debug_value_addr(${L}, ${Ae}, (int)((unsigned long long)(${q[1]})));`);continue}if(/[*&\[]/.test(F))continue;let te=F.match(/([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?\s*$/);if(!te)continue;let ue=te[1],ee=/\bbool\b/.test(F)?"bool":/\b(?:int|float|double|char|short|long)\b/.test(F)?"number":"";if(!ee)continue;let Se=D++;$.set(ue,{slot:Se,kind:ee,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[L]=[...this.debugVariableMetadata[L]||[],{slot:Se,name:ue,kind:ee,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],_e.push(`${V}    ${ee==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${L}, ${Se}, ${ue});`)}K=void 0}else k===0&&w.includes("(")&&w.includes(")")&&!w.includes("{")&&!w.endsWith(";")&&!/^(if|for|while|switch|catch)\b/.test(w)&&!/^(class|struct|namespace|enum|union)\b/.test(w)?K={functionName:w.slice(0,w.indexOf("(")).trim().split(/\s+/).pop()||"anonymous",parameters:w.slice(w.indexOf("(")+1,w.lastIndexOf(")"))}:w&&w!=="{"&&(K=void 0);k>0&&Y<k&&(k=0,L=0,$=new Map,G=new Map)}ge.length&&(r==="CPP"?(_e.push("struct __wasm_idle_debug_globals_init {"),_e.push("    __wasm_idle_debug_globals_init() {"),_e.push(...ge.map(C=>`        ${C}`)),_e.push("    }"),_e.push("} __wasm_idle_debug_globals_init_instance;")):(_e.push("__attribute__((constructor)) static void __wasm_idle_debug_globals_init(void) {"),_e.push(...ge.map(C=>`    ${C}`)),_e.push("}"))),_=_e.join(`
`)}else this.debugVariableMetadata={},this.debugGlobalMetadata=[],this.debugFunctionMetadata={};typeof e.transformSource=="function"&&(_=e.transformSource(_));let f=ki(_);await(r!=="C"||Bi(s)?this.ensureCppSysroot():this.ready),e.sourceAlreadyMounted||(this.addWorkspaceFiles(e.workspaceFiles,n),this.addWorkspaceDirectories(n),this.memfs.addFile(n,f)),this.memfs.addFile(i,new Uint8Array(0));let I=await this.getModule(this.assetUrls.clang),m=this.compilerConfig?.resourceDir||Wo,A=Ni(r,"",m).flatMap(h=>["-internal-isystem",h]),b=(h,y,S,N,x=[])=>["-cc1","-triple",Si,h,"-disable-free","-isysroot","/","-resource-dir",m,...A,...r==="OBJC"?["-I."]:[],"-ferror-limit","19","-fcolor-diagnostics",...c?[]:["-O"+p],"-o",y,a,"-x",S,...r==="OBJC"?Ai:[],...x,N,...s,...c?["-O0","-debug-info-kind=standalone","-dwarf-version=4","-debugger-tuning=gdb","-fdebug-compilation-dir=/workspace"]:[]],E=r==="CPP"&&!l&&typeof e.transformSource!="function"&&Gi(_)&&Hi(s)?(()=>{let h=b("-emit-pch",`/${Ye}`,"c++-header",V_);return{key:JSON.stringify({args:h,assets:this.assetUrls}),args:h}})():void 0;if(E&&(this.precompiledHeaderPlan=E),e.planPrecompiledHeaderOnly)return null;let u=e.precompiledHeader;if(E&&u?.key===E.key){this.mountedPrecompiledHeaderKey!==u.key&&(this.addWorkspaceDirectories(Ye),this.memfs.addFile(Ye,u.bytes),this.mountedPrecompiledHeaderKey=u.key),this.trace(`compile ${n} -> ${i} with ${Ye}`);let h=[],y=this.memfs.stdout;this.memfs.stdout=N=>h.push(N);let S=!1;try{let N=await this.run(I,!0,"clang",...b("-emit-obj",i,o,n,["-include-pch",`/${Ye}`]));return this.usedPrecompiledHeader=!0,N}catch(N){if(S=Fi.test(h.join("")),!S){if(Uint8Array.from(this.memfs.getFileContents(i)).length>0)return this.usedPrecompiledHeader=!0,null;throw N}this.trace(`precompiled header rejected; compiling ${n} without it`),this.memfs.addFile(i,new Uint8Array(0))}finally{if(this.memfs.stdout=y,!S)for(let N of h)y(N)}}let g=b("-emit-obj",i,o,n);this.trace(`compile ${n} -> ${i}`);try{return await this.run(I,!0,"clang",...g)}catch(h){if(Uint8Array.from(this.memfs.getFileContents(i)).length>0)return this.trace(`recover ${i} after clang output stream exit`),null;throw h}}async link(e,n,_="none",i="CPP"){let r=typeof e=="string"?[e]:[...e];if(r.length===0||r.some(f=>typeof f!="string"||f.length===0))throw new TypeError("At least one nonempty object file is required for linking");let s=typeof _=="boolean"?sn({debug:_}):sn({debugMode:_}),o=1024*1024,a="lib/wasm32-wasi",d=this.compilerConfig?.compilerRuntimeLibDir||$o,l=`${a}/crt1.o`;await(i==="C"?this.ready:this.ensureCppSysroot());let c=await this.prepareLongDoubleLinkArgs(),p=await this.getModule(this.assetUrls.lld);return this.trace(`link ${r.join(", ")} -> ${n}`),await this.run(p,this.log,"wasm-ld","--export-dynamic",...s==="trace"?["--allow-undefined"]:[],"-z",`stack-size=${o}`,`-L${a}/noeh`,`-L${a}`,l,...r,...c,"-lc",...i==="C"?[]:["-lc++","-lc++abi"],"-lm",`-L${d}`,"-lclang_rt.builtins-wasm32","-o",n)}async run(e,n,..._){return this.runWithOptions(e,n,_)}async runWithOptions(e,n,_,i={},r,s){this.memfs.out=n,this.hostLog(`${_.join(" ")}
`),this.trace(`run ${_.join(" ")}`);let o=+new Date,a=new ot(e,this.memfs,_[0],..._.slice(1),{extraImports:r,instanceRef:s});a.environ={...a.environ,...i},a.trace=p=>this.trace(p),a.debugSession={buffer:this.debugBuffer,interruptBuffer:this.debugInterruptBuffer,watchBuffer:this.debugWatchBuffer,watchResultBuffer:this.debugWatchResultBuffer,breakpoints:new Set(this.debugBreakpoints),breakpointVersion:0,pauseOnEntry:this.debugPauseOnEntry,stepArmed:this.debugPauseOnEntry,nextLineArmed:!1,stepOutArmed:!1,callDepth:0,stepOutDepth:0,currentFunctionId:0,currentLine:0,resumeSkipActive:!1,resumeSkipFunctionId:0,resumeSkipLine:0,nextLineFunctionId:0,nextLineLine:0,variableMetadata:this.debugVariableMetadata,globalVariableMetadata:this.debugGlobalMetadata,functionMetadata:this.debugFunctionMetadata,frames:[],globalValues:new Map,onPause:p=>this.onDebugEvent?.(p)};let d=+new Date,l=await a.run(),c=+new Date;return this.log&&this.stdout(`
`),this.showTiming&&this.stdout(`${W_}(${o-d}ms/${c-d}ms)${Vt}
`),l?a:null}async compileLink(e,n={}){let{language:_="CPP",fileName:i,activePath:r,workspaceFiles:s=[],args:o=[],compileArgs:a=o,debugMode:d,debug:l,breakpoints:c=[],pauseOnEntry:p=!1,cppVersion:f,cVersion:T,debugBuffer:I,interruptBuffer:m,watchBuffer:A,watchResultBuffer:b,precompiledHeader:E}=n,u=sn({debugMode:d,debug:l}),g=u==="lldb"?mn:We,h=s.map(P=>({...P,path:g(P.path)})),y=g(r||"")||g(i||"")||void 0,{input:S,obj:N,wasm:x}=Xn(_,y),M=new Map;for(let P of h)if(P.path){if(P.path===nn||P.path.startsWith(`${nn}/`))throw new Error(`Workspace path uses reserved build namespace ${JSON.stringify(nn)}`);M.set(P.path,P)}if(S===nn||S.startsWith(`${nn}/`))throw new Error(`Active source path uses reserved build namespace ${JSON.stringify(nn)}`);M.set(S,{path:S,content:e});let W=[...M.values()].sort((P,G)=>P.path<G.path?-1:P.path>G.path?1:0),Y=W.filter(P=>P.path===S||Vo.test(P.path)),L=_==="C"&&Y.every(P=>P.path===S||P.path.endsWith(".c"))&&!Bi(a)?["C"]:[],B=u==="trace";if(B&&Y.length>1)throw new Error("Trace debug mode does not support multiple C/C++ translation units");this.beginTrace(B),this.debugBreakpoints=new Set(B?c:[]),this.debugPauseOnEntry=B&&p,this.debugBuffer=I,this.debugInterruptBuffer=m,this.debugWatchBuffer=A,this.debugWatchResultBuffer=b,this.lastArtifactPath=x;let D=JSON.stringify({code:e,input:S,wasm:x,language:_,compileArgs:a,workspaceFiles:W,cppVersion:f,cVersion:T,debugMode:u});if(this.lastBuildKey===D)return this.trace(`reuse ${x}`),this.wasm;if(this.precompiledHeaderPlan=void 0,this.usedPrecompiledHeader=!1,this.getModule(this.assetUrls.lld).catch(()=>{}),Y.length===1)await this.compile({input:S,code:e,obj:N,language:_,compileArgs:a,workspaceFiles:h,cppVersion:f,cVersion:T,debugMode:u,precompiledHeader:E}),await this.link(N,x,u,...L);else{await this.ready,this.addWorkspaceFiles(W),this.memfs.addDirectory(nn),this.memfs.addDirectory(`${nn}/objects`);let P=[];for(let[G,K]of Y.entries()){let me=`${nn}/objects/${G.toString().padStart(4,"0")}.o`;P.push(me),await this.compile({input:K.path,code:K.content,obj:me,language:K.path===S?_:K.path.endsWith(".c")?"C":"CPP",compileArgs:a,workspaceFiles:[],cppVersion:f,cVersion:T,debugMode:u,precompiledHeader:E,sourceAlreadyMounted:!0})}await this.link(P,x,u,...L)}this.lastBuildKey=D;let $=Uint8Array.from(this.memfs.getFileContents(x));return this.wasm=await this.hostLogAsync(`Compiling ${x}`,WebAssembly.compile($))}async buildPrecompiledHeader(){let e=this.precompiledHeaderPlan;if(!e)return;await this.ensureCppSysroot(),this.addWorkspaceDirectories(Ye),this.memfs.addFile(Ye,new Uint8Array(0)),this.mountedPrecompiledHeaderKey="";let n=await this.getModule(this.assetUrls.clang);this.trace(`precompile ${V_} -> ${Ye}`);try{await this.run(n,!1,"clang",...e.args)}catch{}let _=Uint8Array.from(this.memfs.getFileContents(Ye));if(_.length!==0)return this.mountedPrecompiledHeaderKey=e.key,{key:e.key,bytes:_}}async buildPrecompiledHeaderFor(e,n={}){let{language:_="CPP",fileName:i,activePath:r,args:s=[],compileArgs:o=s}=n,a=sn(n),d=a==="lldb"?mn:We,l=d(r||"")||d(i||"")||void 0,{input:c,obj:p}=Xn(_,l);return this.precompiledHeaderPlan=void 0,await this.compile({input:c,code:e,obj:p,language:_,compileArgs:o,cppVersion:n.cppVersion,cVersion:n.cVersion,debugMode:a,planPrecompiledHeaderOnly:!0}),this.buildPrecompiledHeader()}async compileArtifact(e,n={}){let _=sn(n),i=await this.compileLink(e,n),r=Uint8Array.from(this.memfs.getFileContents(this.lastArtifactPath)),s=n.language||"CPP",o={code:e,language:s,fileName:n.fileName,activePath:n.activePath,workspaceFiles:n.workspaceFiles,compileArgs:n.compileArgs,cppVersion:n.cppVersion,cVersion:n.cVersion,debugMode:_};return{bytes:r,wasm:i,target:"wasm32-wasi",format:"wasi-core-wasm",fileName:this.lastArtifactPath,language:s,..._==="trace"?{debugMetadata:{variableMetadata:this.debugVariableMetadata,globalVariableMetadata:this.debugGlobalMetadata,functionMetadata:this.debugFunctionMetadata}}:{},..._==="lldb"?{debug:await Ui(o,r,this.compilerConfig?.provenance)}:{}}}async compileLinkRun(e,n={}){let{language:_="CPP",fileName:i,activePath:r,workspaceFiles:s=[],args:o=[],compileArgs:a=o,programArgs:d=[],debugMode:l,debug:c,breakpoints:p=[],pauseOnEntry:f=!1,cppVersion:T,cVersion:I,debugBuffer:m,interruptBuffer:A,watchBuffer:b,watchResultBuffer:E,precompiledHeader:u}=n,g=sn({debugMode:l,debug:c});if(g==="lldb")throw new Error("compileLinkRun() cannot execute LLDB artifacts in the browser WebAssembly engine. Use compileArtifact() and @wasm-idle/llvm-core/debug instead.");this.debug=g==="trace";let h=We(r||"")||We(i||"")||void 0,{wasm:y}=Xn(_,h);return await this.run(await this.compileLink(e,{language:_,fileName:i,activePath:r,workspaceFiles:s,compileArgs:a,debugMode:g,breakpoints:p,pauseOnEntry:f,cppVersion:T,cVersion:I,debugBuffer:m,interruptBuffer:A,watchBuffer:b,watchResultBuffer:E,...u?{precompiledHeader:u}:{}}),!0,y,...d)}};var Y_=z_;function ye(t,e){if(!t||typeof t!="object"||Array.isArray(t))throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return t}function Ne(t,e){if(typeof t!="string"||t.length===0)throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return t}function Ko(t,e){if(t!=="wasm32-wasi")throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return t}function qo(t){let e=ye(t,"root.compiler.provenance");if(e.name!=="clang")throw new Error("invalid root.compiler.provenance.name in wasm-clang runtime manifest");return{name:"clang",version:Ne(e.version,"root.compiler.provenance.version"),revision:Ne(e.revision,"root.compiler.provenance.revision")}}function Jo(t){let e=ye(t,"root.compiler.sysroot.profiles");return{c:{asset:Ne(ye(e.c,"root.compiler.sysroot.profiles.c").asset,"root.compiler.sysroot.profiles.c.asset")},cppAddon:{asset:Ne(ye(e.cppAddon,"root.compiler.sysroot.profiles.cppAddon").asset,"root.compiler.sysroot.profiles.cppAddon.asset")}}}function Zo(t){let e=ye(t,"root.compiler"),n=ye(e.sysroot,"root.compiler.sysroot");return{memfs:{asset:Ne(ye(e.memfs,"root.compiler.memfs").asset,"root.compiler.memfs.asset"),argv0:Ne(ye(e.memfs,"root.compiler.memfs").argv0,"root.compiler.memfs.argv0")},clang:{asset:Ne(ye(e.clang,"root.compiler.clang").asset,"root.compiler.clang.asset"),argv0:Ne(ye(e.clang,"root.compiler.clang").argv0,"root.compiler.clang.argv0")},lld:{asset:Ne(ye(e.lld,"root.compiler.lld").asset,"root.compiler.lld.asset"),argv0:Ne(ye(e.lld,"root.compiler.lld").argv0,"root.compiler.lld.argv0")},sysroot:{asset:Ne(n.asset,"root.compiler.sysroot.asset"),...n.printscanLongDouble===void 0?{}:{printscanLongDouble:{asset:Ne(ye(n.printscanLongDouble,"root.compiler.sysroot.printscanLongDouble").asset,"root.compiler.sysroot.printscanLongDouble.asset")}},...typeof n.runtimeRoot=="string"?{runtimeRoot:n.runtimeRoot}:{},...n.profiles===void 0?{}:{profiles:Jo(n.profiles)}},...e.resourceDir!==void 0?{resourceDir:Ne(e.resourceDir,"root.compiler.resourceDir")}:{},...e.compilerRuntimeLibDir!==void 0?{compilerRuntimeLibDir:Ne(e.compilerRuntimeLibDir,"root.compiler.compilerRuntimeLibDir")}:{},...typeof e.defaultCppStandard=="string"?{defaultCppStandard:e.defaultCppStandard}:{},...typeof e.defaultCStandard=="string"?{defaultCStandard:e.defaultCStandard}:{},...e.provenance!==void 0?{provenance:qo(e.provenance)}:{}}}function Qo(t){let e=ye(t,"root.clangd");return{js:Ne(e.js,"root.clangd.js"),wasm:Ne(e.wasm,"root.clangd.wasm")}}function ea(t,e){let n=ye(t,e);if(ye(n.execution,`${e}.execution`).kind!=="wasi-preview1")throw new Error(`invalid ${e}.execution.kind in wasm-clang runtime manifest`);if(n.artifactFormat!=="wasi-core-wasm")throw new Error(`invalid ${e}.artifactFormat in wasm-clang runtime manifest`);return{artifactFormat:"wasi-core-wasm",execution:{kind:"wasi-preview1"}}}function na(t){let e=ye(t,"root.targets");return{"wasm32-wasi":ea(e["wasm32-wasi"],"root.targets.wasm32-wasi")}}function zt(t){let e=ye(t,"root");if(e.manifestVersion!==1)throw new Error("invalid root.manifestVersion in wasm-clang runtime manifest");return{manifestVersion:1,version:Ne(e.version,"root.version"),defaultTarget:Ko(e.defaultTarget,"root.defaultTarget"),compiler:Zo(e.compiler),clangd:Qo(e.clangd),targets:na(e.targets)}}async function K_(t,e=fetch,n,_=Gt){let i=$_(t,"wasm-clang runtime manifest URL");return zt(await ti(i,{fetchImpl:e,label:"wasm-clang runtime manifest",maxBytes:Math.min(_,Gt),signal:n}))}function q_(t){return jt(t)}var oe={};f_(oe,{ADVICE_DONTNEED:()=>el,ADVICE_NOREUSE:()=>nl,ADVICE_NORMAL:()=>qd,ADVICE_RANDOM:()=>Zd,ADVICE_SEQUENTIAL:()=>Jd,ADVICE_WILLNEED:()=>Qd,CLOCKID_MONOTONIC:()=>ut,CLOCKID_PROCESS_CPUTIME_ID:()=>ia,CLOCKID_REALTIME:()=>ft,CLOCKID_THREAD_CPUTIME_ID:()=>sa,Ciovec:()=>$n,Dirent:()=>Tn,ERRNO_2BIG:()=>oa,ERRNO_ACCES:()=>aa,ERRNO_ADDRINUSE:()=>da,ERRNO_ADDRNOTAVAIL:()=>la,ERRNO_AFNOSUPPORT:()=>ca,ERRNO_AGAIN:()=>fa,ERRNO_ALREADY:()=>ua,ERRNO_BADF:()=>U,ERRNO_BADMSG:()=>pa,ERRNO_BUSY:()=>ha,ERRNO_CANCELED:()=>ma,ERRNO_CHILD:()=>Ta,ERRNO_CONNABORTED:()=>ga,ERRNO_CONNREFUSED:()=>Ia,ERRNO_CONNRESET:()=>Sa,ERRNO_DEADLK:()=>Aa,ERRNO_DESTADDRREQ:()=>ya,ERRNO_DOM:()=>Ea,ERRNO_DQUOT:()=>Na,ERRNO_EXIST:()=>Vn,ERRNO_FAULT:()=>ba,ERRNO_FBIG:()=>xa,ERRNO_HOSTUNREACH:()=>wa,ERRNO_IDRM:()=>La,ERRNO_ILSEQ:()=>Ra,ERRNO_INPROGRESS:()=>Ca,ERRNO_INTR:()=>va,ERRNO_INVAL:()=>Ke,ERRNO_IO:()=>Ma,ERRNO_ISCONN:()=>Da,ERRNO_ISDIR:()=>Kt,ERRNO_LOOP:()=>Pa,ERRNO_MFILE:()=>Oa,ERRNO_MLINK:()=>Ua,ERRNO_MSGSIZE:()=>Fa,ERRNO_MULTIHOP:()=>Ga,ERRNO_NAMETOOLONG:()=>J_,ERRNO_NETDOWN:()=>Ha,ERRNO_NETRESET:()=>Ba,ERRNO_NETUNREACH:()=>ka,ERRNO_NFILE:()=>Xa,ERRNO_NOBUFS:()=>Wa,ERRNO_NODEV:()=>$a,ERRNO_NOENT:()=>tn,ERRNO_NOEXEC:()=>Va,ERRNO_NOLCK:()=>ja,ERRNO_NOLINK:()=>za,ERRNO_NOMEM:()=>Ya,ERRNO_NOMSG:()=>Ka,ERRNO_NOPROTOOPT:()=>qa,ERRNO_NOSPC:()=>Ja,ERRNO_NOSYS:()=>Z_,ERRNO_NOTCAPABLE:()=>Jt,ERRNO_NOTCONN:()=>Za,ERRNO_NOTDIR:()=>$e,ERRNO_NOTEMPTY:()=>qt,ERRNO_NOTRECOVERABLE:()=>Qa,ERRNO_NOTSOCK:()=>ed,ERRNO_NOTSUP:()=>Q,ERRNO_NOTTY:()=>nd,ERRNO_NXIO:()=>td,ERRNO_OVERFLOW:()=>_d,ERRNO_OWNERDEAD:()=>rd,ERRNO_PERM:()=>jn,ERRNO_PIPE:()=>id,ERRNO_PROTO:()=>sd,ERRNO_PROTONOSUPPORT:()=>od,ERRNO_PROTOTYPE:()=>ad,ERRNO_RANGE:()=>dd,ERRNO_ROFS:()=>ld,ERRNO_SPIPE:()=>cd,ERRNO_SRCH:()=>fd,ERRNO_STALE:()=>ud,ERRNO_SUCCESS:()=>z,ERRNO_TIMEDOUT:()=>pd,ERRNO_TXTBSY:()=>hd,ERRNO_XDEV:()=>md,EVENTRWFLAGS_FD_READWRITE_HANGUP:()=>fl,EVENTTYPE_CLOCK:()=>Q_,EVENTTYPE_FD_READ:()=>ll,EVENTTYPE_FD_WRITE:()=>cl,Event:()=>lt,FDFLAGS_APPEND:()=>e_,FDFLAGS_DSYNC:()=>tl,FDFLAGS_NONBLOCK:()=>_l,FDFLAGS_RSYNC:()=>rl,FDFLAGS_SYNC:()=>il,FD_STDERR:()=>ra,FD_STDIN:()=>ta,FD_STDOUT:()=>_a,FILETYPE_BLOCK_DEVICE:()=>jd,FILETYPE_CHARACTER_DEVICE:()=>Xi,FILETYPE_DIRECTORY:()=>Ce,FILETYPE_REGULAR_FILE:()=>Sn,FILETYPE_SOCKET_DGRAM:()=>zd,FILETYPE_SOCKET_STREAM:()=>Yd,FILETYPE_SYMBOLIC_LINK:()=>Kd,FILETYPE_UNKNOWN:()=>Vd,FSTFLAGS_ATIM:()=>sl,FSTFLAGS_ATIM_NOW:()=>ol,FSTFLAGS_MTIM:()=>al,FSTFLAGS_MTIM_NOW:()=>dl,Fdstat:()=>gn,Filestat:()=>In,Iovec:()=>Wn,OFLAGS_CREAT:()=>mt,OFLAGS_DIRECTORY:()=>An,OFLAGS_EXCL:()=>n_,OFLAGS_TRUNC:()=>Tt,PREOPENTYPE_DIR:()=>Wi,Prestat:()=>ct,PrestatDir:()=>Yt,RIFLAGS_RECV_PEEK:()=>$l,RIFLAGS_RECV_WAITALL:()=>Vl,RIGHTS_FD_ADVISE:()=>Ed,RIGHTS_FD_ALLOCATE:()=>Nd,RIGHTS_FD_DATASYNC:()=>Td,RIGHTS_FD_FDSTAT_SET_FLAGS:()=>Sd,RIGHTS_FD_FILESTAT_GET:()=>Fd,RIGHTS_FD_FILESTAT_SET_SIZE:()=>Gd,RIGHTS_FD_FILESTAT_SET_TIMES:()=>Hd,RIGHTS_FD_READ:()=>gd,RIGHTS_FD_READDIR:()=>Cd,RIGHTS_FD_SEEK:()=>Id,RIGHTS_FD_SYNC:()=>Ad,RIGHTS_FD_TELL:()=>yd,RIGHTS_FD_WRITE:()=>pt,RIGHTS_PATH_CREATE_DIRECTORY:()=>bd,RIGHTS_PATH_CREATE_FILE:()=>xd,RIGHTS_PATH_FILESTAT_GET:()=>Pd,RIGHTS_PATH_FILESTAT_SET_SIZE:()=>Od,RIGHTS_PATH_FILESTAT_SET_TIMES:()=>Ud,RIGHTS_PATH_LINK_SOURCE:()=>wd,RIGHTS_PATH_LINK_TARGET:()=>Ld,RIGHTS_PATH_OPEN:()=>Rd,RIGHTS_PATH_READLINK:()=>vd,RIGHTS_PATH_REMOVE_DIRECTORY:()=>kd,RIGHTS_PATH_RENAME_SOURCE:()=>Md,RIGHTS_PATH_RENAME_TARGET:()=>Dd,RIGHTS_PATH_SYMLINK:()=>Bd,RIGHTS_PATH_UNLINK_FILE:()=>Xd,RIGHTS_POLL_FD_READWRITE:()=>Wd,RIGHTS_SOCK_SHUTDOWN:()=>$d,ROFLAGS_RECV_DATA_TRUNCATED:()=>jl,SDFLAGS_RD:()=>zl,SDFLAGS_WR:()=>Yl,SIGNAL_ABRT:()=>Il,SIGNAL_ALRM:()=>wl,SIGNAL_BUS:()=>Sl,SIGNAL_CHLD:()=>Rl,SIGNAL_CONT:()=>Cl,SIGNAL_FPE:()=>Al,SIGNAL_HUP:()=>pl,SIGNAL_ILL:()=>Tl,SIGNAL_INT:()=>hl,SIGNAL_KILL:()=>yl,SIGNAL_NONE:()=>ul,SIGNAL_PIPE:()=>xl,SIGNAL_POLL:()=>kl,SIGNAL_PROF:()=>Hl,SIGNAL_PWR:()=>Xl,SIGNAL_QUIT:()=>ml,SIGNAL_SEGV:()=>Nl,SIGNAL_STOP:()=>vl,SIGNAL_SYS:()=>Wl,SIGNAL_TERM:()=>Ll,SIGNAL_TRAP:()=>gl,SIGNAL_TSTP:()=>Ml,SIGNAL_TTIN:()=>Dl,SIGNAL_TTOU:()=>Pl,SIGNAL_URG:()=>Ol,SIGNAL_USR1:()=>El,SIGNAL_USR2:()=>bl,SIGNAL_VTALRM:()=>Gl,SIGNAL_WINCH:()=>Bl,SIGNAL_XCPU:()=>Ul,SIGNAL_XFSZ:()=>Fl,SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME:()=>er,Subscription:()=>dt,WHENCE_CUR:()=>Qt,WHENCE_END:()=>ht,WHENCE_SET:()=>Zt});var ta=0,_a=1,ra=2,ft=0,ut=1,ia=2,sa=3,z=0,oa=1,aa=2,da=3,la=4,ca=5,fa=6,ua=7,U=8,pa=9,ha=10,ma=11,Ta=12,ga=13,Ia=14,Sa=15,Aa=16,ya=17,Ea=18,Na=19,Vn=20,ba=21,xa=22,wa=23,La=24,Ra=25,Ca=26,va=27,Ke=28,Ma=29,Da=30,Kt=31,Pa=32,Oa=33,Ua=34,Fa=35,Ga=36,J_=37,Ha=38,Ba=39,ka=40,Xa=41,Wa=42,$a=43,tn=44,Va=45,ja=46,za=47,Ya=48,Ka=49,qa=50,Ja=51,Z_=52,Za=53,$e=54,qt=55,Qa=56,ed=57,Q=58,nd=59,td=60,_d=61,rd=62,jn=63,id=64,sd=65,od=66,ad=67,dd=68,ld=69,cd=70,fd=71,ud=72,pd=73,hd=74,md=75,Jt=76,Td=1,gd=2,Id=4,Sd=8,Ad=16,yd=32,pt=64,Ed=128,Nd=256,bd=512,xd=1024,wd=2048,Ld=4096,Rd=8192,Cd=16384,vd=32768,Md=65536,Dd=131072,Pd=262144,Od=524288,Ud=1048576,Fd=2097152,Gd=4194304,Hd=8388608,Bd=16777216,kd=33554432,Xd=67108864,Wd=134217728,$d=268435456,Wn=class t{static read_bytes(e,n){let _=new t;return _.buf=e.getUint32(n,!0),_.buf_len=e.getUint32(n+4,!0),_}static read_bytes_array(e,n,_){let i=[];for(let r=0;r<_;r++)i.push(t.read_bytes(e,n+8*r));return i}},$n=class t{static read_bytes(e,n){let _=new t;return _.buf=e.getUint32(n,!0),_.buf_len=e.getUint32(n+4,!0),_}static read_bytes_array(e,n,_){let i=[];for(let r=0;r<_;r++)i.push(t.read_bytes(e,n+8*r));return i}},Zt=0,Qt=1,ht=2,Vd=0,jd=1,Xi=2,Ce=3,Sn=4,zd=5,Yd=6,Kd=7,Tn=class{head_length(){return 24}name_length(){return this.dir_name.byteLength}write_head_bytes(e,n){e.setBigUint64(n,this.d_next,!0),e.setBigUint64(n+8,this.d_ino,!0),e.setUint32(n+16,this.dir_name.length,!0),e.setUint8(n+20,this.d_type)}write_name_bytes(e,n,_){e.set(this.dir_name.slice(0,Math.min(this.dir_name.byteLength,_)),n)}constructor(e,n,_,i){let r=new TextEncoder().encode(_);this.d_next=e,this.d_ino=n,this.d_namlen=r.byteLength,this.d_type=i,this.dir_name=r}},qd=0,Jd=1,Zd=2,Qd=3,el=4,nl=5,e_=1,tl=2,_l=4,rl=8,il=16,gn=class{write_bytes(e,n){e.setUint8(n,this.fs_filetype),e.setUint16(n+2,this.fs_flags,!0),e.setBigUint64(n+8,this.fs_rights_base,!0),e.setBigUint64(n+16,this.fs_rights_inherited,!0)}constructor(e,n){this.fs_rights_base=0n,this.fs_rights_inherited=0n,this.fs_filetype=e,this.fs_flags=n}},sl=1,ol=2,al=4,dl=8,mt=1,An=2,n_=4,Tt=8,In=class{write_bytes(e,n){e.setBigUint64(n,this.dev,!0),e.setBigUint64(n+8,this.ino,!0),e.setUint8(n+16,this.filetype),e.setBigUint64(n+24,this.nlink,!0),e.setBigUint64(n+32,this.size,!0),e.setBigUint64(n+38,this.atim,!0),e.setBigUint64(n+46,this.mtim,!0),e.setBigUint64(n+52,this.ctim,!0)}constructor(e,n,_){this.dev=0n,this.nlink=0n,this.atim=0n,this.mtim=0n,this.ctim=0n,this.ino=e,this.filetype=n,this.size=_}},Q_=0,ll=1,cl=2,fl=1,er=1,dt=class t{static read_bytes(e,n){return new t(e.getBigUint64(n,!0),e.getUint8(n+8),e.getUint32(n+16,!0),e.getBigUint64(n+24,!0),e.getUint16(n+36,!0))}constructor(e,n,_,i,r){this.userdata=e,this.eventtype=n,this.clockid=_,this.timeout=i,this.flags=r}},lt=class{write_bytes(e,n){e.setBigUint64(n,this.userdata,!0),e.setUint16(n+8,this.error,!0),e.setUint8(n+10,this.eventtype)}constructor(e,n,_){this.userdata=e,this.error=n,this.eventtype=_}},ul=0,pl=1,hl=2,ml=3,Tl=4,gl=5,Il=6,Sl=7,Al=8,yl=9,El=10,Nl=11,bl=12,xl=13,wl=14,Ll=15,Rl=16,Cl=17,vl=18,Ml=19,Dl=20,Pl=21,Ol=22,Ul=23,Fl=24,Gl=25,Hl=26,Bl=27,kl=28,Xl=29,Wl=30,$l=1,Vl=2,jl=1,zl=1,Yl=2,Wi=0,Yt=class{write_bytes(e,n){e.setUint32(n,this.pr_name.byteLength,!0)}constructor(e){this.pr_name=new TextEncoder().encode(e)}},ct=class t{static dir(e){let n=new t;return n.tag=Wi,n.inner=new Yt(e),n}write_bytes(e,n){e.setUint32(n,this.tag,!0),this.inner.write_bytes(e,n+4)}};var Kl=class{enable(e){this.log=ql(e===void 0?!0:e,this.prefix)}get enabled(){return this.isEnabled}constructor(e){this.isEnabled=e,this.prefix="wasi:",this.enable(e)}};function ql(t,e){return t?console.log.bind(console,"%c%s","color: #265BA0",e):()=>{}}var Ee=new Kl(!1);var gt=class extends Error{constructor(e){super("exit with exit code "+e),this.code=e}},It=class{start(e){this.inst=e;try{return e.exports._start(),0}catch(n){if(n instanceof gt)return n.code;throw n}}initialize(e){this.inst=e,e.exports._initialize&&e.exports._initialize()}constructor(e,n,_,i={}){this.args=[],this.env=[],this.fds=[],Ee.enable(i.debug),this.args=e,this.env=n,this.fds=_;let r=this;this.wasiImport={args_sizes_get(s,o){let a=new DataView(r.inst.exports.memory.buffer);a.setUint32(s,r.args.length,!0);let d=0;for(let l of r.args)d+=l.length+1;return a.setUint32(o,d,!0),Ee.log(a.getUint32(s,!0),a.getUint32(o,!0)),0},args_get(s,o){let a=new DataView(r.inst.exports.memory.buffer),d=new Uint8Array(r.inst.exports.memory.buffer),l=o;for(let c=0;c<r.args.length;c++){a.setUint32(s,o,!0),s+=4;let p=new TextEncoder().encode(r.args[c]);d.set(p,o),a.setUint8(o+p.length,0),o+=p.length+1}return Ee.enabled&&Ee.log(new TextDecoder("utf-8").decode(d.slice(l,o))),0},environ_sizes_get(s,o){let a=new DataView(r.inst.exports.memory.buffer);a.setUint32(s,r.env.length,!0);let d=0;for(let l of r.env)d+=new TextEncoder().encode(l).length+1;return a.setUint32(o,d,!0),Ee.log(a.getUint32(s,!0),a.getUint32(o,!0)),0},environ_get(s,o){let a=new DataView(r.inst.exports.memory.buffer),d=new Uint8Array(r.inst.exports.memory.buffer),l=o;for(let c=0;c<r.env.length;c++){a.setUint32(s,o,!0),s+=4;let p=new TextEncoder().encode(r.env[c]);d.set(p,o),a.setUint8(o+p.length,0),o+=p.length+1}return Ee.enabled&&Ee.log(new TextDecoder("utf-8").decode(d.slice(l,o))),0},clock_res_get(s,o){let a;switch(s){case 1:{a=5000n;break}case 0:{a=1000000n;break}default:return 52}return new DataView(r.inst.exports.memory.buffer).setBigUint64(o,a,!0),0},clock_time_get(s,o,a){let d=new DataView(r.inst.exports.memory.buffer);if(s===0)d.setBigUint64(a,BigInt(new Date().getTime())*1000000n,!0);else if(s==1){let l;try{l=BigInt(Math.round(performance.now()*1e6))}catch{l=0n}d.setBigUint64(a,l,!0)}else d.setBigUint64(a,0n,!0);return 0},fd_advise(s,o,a,d){return r.fds[s]!=null?0:8},fd_allocate(s,o,a){return r.fds[s]!=null?r.fds[s].fd_allocate(o,a):8},fd_close(s){if(r.fds[s]!=null){let o=r.fds[s].fd_close();return r.fds[s]=void 0,o}else return 8},fd_datasync(s){return r.fds[s]!=null?r.fds[s].fd_sync():8},fd_fdstat_get(s,o){if(r.fds[s]!=null){let{ret:a,fdstat:d}=r.fds[s].fd_fdstat_get();return d?.write_bytes(new DataView(r.inst.exports.memory.buffer),o),a}else return 8},fd_fdstat_set_flags(s,o){return r.fds[s]!=null?r.fds[s].fd_fdstat_set_flags(o):8},fd_fdstat_set_rights(s,o,a){return r.fds[s]!=null?r.fds[s].fd_fdstat_set_rights(o,a):8},fd_filestat_get(s,o){if(r.fds[s]!=null){let{ret:a,filestat:d}=r.fds[s].fd_filestat_get();return d?.write_bytes(new DataView(r.inst.exports.memory.buffer),o),a}else return 8},fd_filestat_set_size(s,o){return r.fds[s]!=null?r.fds[s].fd_filestat_set_size(o):8},fd_filestat_set_times(s,o,a,d){return r.fds[s]!=null?r.fds[s].fd_filestat_set_times(o,a,d):8},fd_pread(s,o,a,d,l){let c=new DataView(r.inst.exports.memory.buffer),p=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let f=Wn.read_bytes_array(c,o,a),T=0;for(let I of f){let{ret:m,data:A}=r.fds[s].fd_pread(I.buf_len,d);if(m!=0)return c.setUint32(l,T,!0),m;if(p.set(A,I.buf),T+=A.length,d+=BigInt(A.length),A.length!=I.buf_len)break}return c.setUint32(l,T,!0),0}else return 8},fd_prestat_get(s,o){let a=new DataView(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let{ret:d,prestat:l}=r.fds[s].fd_prestat_get();return l?.write_bytes(a,o),d}else return 8},fd_prestat_dir_name(s,o,a){if(r.fds[s]!=null){let{ret:d,prestat:l}=r.fds[s].fd_prestat_get();if(l==null)return d;let c=l.inner.pr_name;return new Uint8Array(r.inst.exports.memory.buffer).set(c.slice(0,a),o),c.byteLength>a?37:0}else return 8},fd_pwrite(s,o,a,d,l){let c=new DataView(r.inst.exports.memory.buffer),p=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let f=$n.read_bytes_array(c,o,a),T=0;for(let I of f){let m=p.slice(I.buf,I.buf+I.buf_len),{ret:A,nwritten:b}=r.fds[s].fd_pwrite(m,d);if(A!=0)return c.setUint32(l,T,!0),A;if(T+=b,d+=BigInt(b),b!=m.byteLength)break}return c.setUint32(l,T,!0),0}else return 8},fd_read(s,o,a,d){let l=new DataView(r.inst.exports.memory.buffer),c=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let p=Wn.read_bytes_array(l,o,a),f=0;for(let T of p){let{ret:I,data:m}=r.fds[s].fd_read(T.buf_len);if(I!=0)return l.setUint32(d,f,!0),I;if(c.set(m,T.buf),f+=m.length,m.length!=T.buf_len)break}return l.setUint32(d,f,!0),0}else return 8},fd_readdir(s,o,a,d,l){let c=new DataView(r.inst.exports.memory.buffer),p=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let f=0;for(;;){let{ret:T,dirent:I}=r.fds[s].fd_readdir_single(d);if(T!=0)return c.setUint32(l,f,!0),T;if(I==null)break;if(a-f<I.head_length()){f=a;break}let m=new ArrayBuffer(I.head_length());if(I.write_head_bytes(new DataView(m),0),p.set(new Uint8Array(m).slice(0,Math.min(m.byteLength,a-f)),o),o+=I.head_length(),f+=I.head_length(),a-f<I.name_length()){f=a;break}I.write_name_bytes(p,o,a-f),o+=I.name_length(),f+=I.name_length(),d=I.d_next}return c.setUint32(l,f,!0),0}else return 8},fd_renumber(s,o){if(r.fds[s]!=null&&r.fds[o]!=null){let a=r.fds[o].fd_close();return a!=0?a:(r.fds[o]=r.fds[s],r.fds[s]=void 0,0)}else return 8},fd_seek(s,o,a,d){let l=new DataView(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let{ret:c,offset:p}=r.fds[s].fd_seek(o,a);return l.setBigInt64(d,p,!0),c}else return 8},fd_sync(s){return r.fds[s]!=null?r.fds[s].fd_sync():8},fd_tell(s,o){let a=new DataView(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let{ret:d,offset:l}=r.fds[s].fd_tell();return a.setBigUint64(o,l,!0),d}else return 8},fd_write(s,o,a,d){let l=new DataView(r.inst.exports.memory.buffer),c=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let p=$n.read_bytes_array(l,o,a),f=0;for(let T of p){let I=c.slice(T.buf,T.buf+T.buf_len),{ret:m,nwritten:A}=r.fds[s].fd_write(I);if(m!=0)return l.setUint32(d,f,!0),m;if(f+=A,A!=I.byteLength)break}return l.setUint32(d,f,!0),0}else return 8},path_create_directory(s,o,a){let d=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return r.fds[s].path_create_directory(l)}else return 8},path_filestat_get(s,o,a,d,l){let c=new DataView(r.inst.exports.memory.buffer),p=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let f=new TextDecoder("utf-8").decode(p.slice(a,a+d)),{ret:T,filestat:I}=r.fds[s].path_filestat_get(o,f);return I?.write_bytes(c,l),T}else return 8},path_filestat_set_times(s,o,a,d,l,c,p){let f=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let T=new TextDecoder("utf-8").decode(f.slice(a,a+d));return r.fds[s].path_filestat_set_times(o,T,l,c,p)}else return 8},path_link(s,o,a,d,l,c,p){let f=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null&&r.fds[l]!=null){let T=new TextDecoder("utf-8").decode(f.slice(a,a+d)),I=new TextDecoder("utf-8").decode(f.slice(c,c+p)),{ret:m,inode_obj:A}=r.fds[s].path_lookup(T,o);return A==null?m:r.fds[l].path_link(I,A,!1)}else return 8},path_open(s,o,a,d,l,c,p,f,T){let I=new DataView(r.inst.exports.memory.buffer),m=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let A=new TextDecoder("utf-8").decode(m.slice(a,a+d));Ee.log(A);let{ret:b,fd_obj:E}=r.fds[s].path_open(o,A,l,c,p,f);if(b!=0)return b;r.fds.push(E);let u=r.fds.length-1;return I.setUint32(T,u,!0),0}else return 8},path_readlink(s,o,a,d,l,c){let p=new DataView(r.inst.exports.memory.buffer),f=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let T=new TextDecoder("utf-8").decode(f.slice(o,o+a));Ee.log(T);let{ret:I,data:m}=r.fds[s].path_readlink(T);if(m!=null){let A=new TextEncoder().encode(m);if(A.length>l)return p.setUint32(c,0,!0),8;f.set(A,d),p.setUint32(c,A.length,!0)}return I}else return 8},path_remove_directory(s,o,a){let d=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return r.fds[s].path_remove_directory(l)}else return 8},path_rename(s,o,a,d,l,c){let p=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null&&r.fds[d]!=null){let f=new TextDecoder("utf-8").decode(p.slice(o,o+a)),T=new TextDecoder("utf-8").decode(p.slice(l,l+c)),{ret:I,inode_obj:m}=r.fds[s].path_unlink(f);if(m==null)return I;if(I=r.fds[d].path_link(T,m,!0),I!=0&&r.fds[s].path_link(f,m,!0)!=0)throw"path_link should always return success when relinking an inode back to the original place";return I}else return 8},path_symlink(s,o,a,d,l){let c=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[a]!=null){let p=new TextDecoder("utf-8").decode(c.slice(s,s+o)),f=new TextDecoder("utf-8").decode(c.slice(d,d+l));return 58}else return 8},path_unlink_file(s,o,a){let d=new Uint8Array(r.inst.exports.memory.buffer);if(r.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return r.fds[s].path_unlink_file(l)}else return 8},poll_oneoff(s,o,a){if(a===0)return 28;if(a>1)return Ee.log("poll_oneoff: only a single subscription is supported"),58;let d=new DataView(r.inst.exports.memory.buffer),l=dt.read_bytes(d,s),c=l.eventtype,p=l.clockid,f=l.timeout;if(c!==Q_)return Ee.log("poll_oneoff: only clock subscriptions are supported"),58;let T;if(p===1)T=()=>BigInt(Math.round(performance.now()*1e6));else if(p===0)T=()=>BigInt(new Date().getTime())*1000000n;else return 28;let I=(l.flags&er)!==0?f:T()+f;for(;I>T(););return new lt(l.userdata,0,c).write_bytes(d,o),0},proc_exit(s){throw new gt(s)},proc_raise(s){throw"raised signal "+s},sched_yield(){},random_get(s,o){let a=new Uint8Array(r.inst.exports.memory.buffer).subarray(s,s+o);if("crypto"in globalThis&&(typeof SharedArrayBuffer>"u"||!(r.inst.exports.memory.buffer instanceof SharedArrayBuffer)))for(let d=0;d<o;d+=65536)crypto.getRandomValues(a.subarray(d,d+65536));else for(let d=0;d<o;d++)a[d]=Math.random()*256|0},sock_recv(s,o,a){throw"sockets not supported"},sock_send(s,o,a){throw"sockets not supported"},sock_shutdown(s,o){throw"sockets not supported"},sock_accept(s,o){throw"sockets not supported"}}}};var qe=class{fd_allocate(e,n){return 58}fd_close(){return 0}fd_fdstat_get(){return{ret:58,fdstat:null}}fd_fdstat_set_flags(e){return 58}fd_fdstat_set_rights(e,n){return 58}fd_filestat_get(){return{ret:58,filestat:null}}fd_filestat_set_size(e){return 58}fd_filestat_set_times(e,n,_){return 58}fd_pread(e,n){return{ret:58,data:new Uint8Array}}fd_prestat_get(){return{ret:58,prestat:null}}fd_pwrite(e,n){return{ret:58,nwritten:0}}fd_read(e){return{ret:58,data:new Uint8Array}}fd_readdir_single(e){return{ret:58,dirent:null}}fd_seek(e,n){return{ret:58,offset:0n}}fd_sync(){return 0}fd_tell(){return{ret:58,offset:0n}}fd_write(e){return{ret:58,nwritten:0}}path_create_directory(e){return 58}path_filestat_get(e,n){return{ret:58,filestat:null}}path_filestat_set_times(e,n,_,i,r){return 58}path_link(e,n,_){return 58}path_unlink(e){return{ret:58,inode_obj:null}}path_lookup(e,n){return{ret:58,inode_obj:null}}path_open(e,n,_,i,r,s){return{ret:54,fd_obj:null}}path_readlink(e){return{ret:58,data:null}}path_remove_directory(e){return 58}path_rename(e,n,_){return 58}path_unlink_file(e){return 58}},He=class t{static issue_ino(){return t.next_ino++}static root_ino(){return 0n}constructor(){this.ino=t.issue_ino()}};He.next_ino=1n;var t_=class extends qe{fd_allocate(e,n){if(!(this.file.size>e+n)){let _=new Uint8Array(Number(e+n));_.set(this.file.data,0),this.file.data=_}return 0}fd_fdstat_get(){return{ret:0,fdstat:new gn(Sn,0)}}fd_filestat_set_size(e){if(this.file.size>e)this.file.data=new Uint8Array(this.file.data.buffer.slice(0,Number(e)));else{let n=new Uint8Array(Number(e));n.set(this.file.data,0),this.file.data=n}return 0}fd_read(e){let n=this.file.data.slice(Number(this.file_pos),Number(this.file_pos+BigInt(e)));return this.file_pos+=BigInt(n.length),{ret:0,data:n}}fd_pread(e,n){return{ret:0,data:this.file.data.slice(Number(n),Number(n+BigInt(e)))}}fd_seek(e,n){let _;switch(n){case Zt:_=e;break;case Qt:_=this.file_pos+e;break;case ht:_=BigInt(this.file.data.byteLength)+e;break;default:return{ret:28,offset:0n}}return _<0?{ret:28,offset:0n}:(this.file_pos=_,{ret:0,offset:this.file_pos})}fd_tell(){return{ret:0,offset:this.file_pos}}fd_write(e){if(this.file.readonly)return{ret:8,nwritten:0};if(this.file_pos+BigInt(e.byteLength)>this.file.size){let n=this.file.data;this.file.data=new Uint8Array(Number(this.file_pos+BigInt(e.byteLength))),this.file.data.set(n)}return this.file.data.set(e,Number(this.file_pos)),this.file_pos+=BigInt(e.byteLength),{ret:0,nwritten:e.byteLength}}fd_pwrite(e,n){if(this.file.readonly)return{ret:8,nwritten:0};if(n+BigInt(e.byteLength)>this.file.size){let _=this.file.data;this.file.data=new Uint8Array(Number(n+BigInt(e.byteLength))),this.file.data.set(_)}return this.file.data.set(e,Number(n)),{ret:0,nwritten:e.byteLength}}fd_filestat_get(){return{ret:0,filestat:this.file.stat()}}constructor(e){super(),this.file_pos=0n,this.file=e}},St=class extends qe{fd_seek(e,n){return{ret:8,offset:0n}}fd_tell(){return{ret:8,offset:0n}}fd_allocate(e,n){return 8}fd_fdstat_get(){return{ret:0,fdstat:new gn(Ce,0)}}fd_readdir_single(e){if(Ee.enabled&&(Ee.log("readdir_single",e),Ee.log(e,this.dir.contents.keys())),e==0n)return{ret:0,dirent:new Tn(1n,this.dir.ino,".",Ce)};if(e==1n)return{ret:0,dirent:new Tn(2n,this.dir.parent_ino(),"..",Ce)};if(e>=BigInt(this.dir.contents.size)+2n)return{ret:0,dirent:null};let[n,_]=Array.from(this.dir.contents.entries())[Number(e-2n)];return{ret:0,dirent:new Tn(e+1n,_.ino,n,_.stat().filetype)}}path_filestat_get(e,n){let{ret:_,path:i}=ln.from(n);if(i==null)return{ret:_,filestat:null};let{ret:r,entry:s}=this.dir.get_entry_for_path(i);return s==null?{ret:r,filestat:null}:{ret:0,filestat:s.stat()}}path_lookup(e,n){let{ret:_,path:i}=ln.from(e);if(i==null)return{ret:_,inode_obj:null};let{ret:r,entry:s}=this.dir.get_entry_for_path(i);return s==null?{ret:r,inode_obj:null}:{ret:0,inode_obj:s}}path_open(e,n,_,i,r,s){let{ret:o,path:a}=ln.from(n);if(a==null)return{ret:o,fd_obj:null};let{ret:d,entry:l}=this.dir.get_entry_for_path(a);if(l==null){if(d!=44)return{ret:d,fd_obj:null};if((_&mt)==mt){let{ret:c,entry:p}=this.dir.create_entry_for_path(n,(_&An)==An);if(p==null)return{ret:c,fd_obj:null};l=p}else return{ret:44,fd_obj:null}}else if((_&n_)==n_)return{ret:20,fd_obj:null};return(_&An)==An&&l.stat().filetype!==Ce?{ret:54,fd_obj:null}:l.path_open(_,i,s)}path_create_directory(e){return this.path_open(0,e,mt|An,0n,0n,0).ret}path_link(e,n,_){let{ret:i,path:r}=ln.from(e);if(r==null)return i;if(r.is_dir)return 44;let{ret:s,parent_entry:o,filename:a,entry:d}=this.dir.get_parent_dir_and_entry_for_path(r,!0);if(o==null||a==null)return s;if(d!=null){let l=n.stat().filetype==Ce,c=d.stat().filetype==Ce;if(l&&c)if(_&&d instanceof Je){if(d.contents.size!=0)return 55}else return 20;else{if(l&&!c)return 54;if(!l&&c)return 31;if(!(n.stat().filetype==Sn&&d.stat().filetype==Sn))return 20}}return!_&&n.stat().filetype==Ce?63:(o.contents.set(a,n),0)}path_unlink(e){let{ret:n,path:_}=ln.from(e);if(_==null)return{ret:n,inode_obj:null};let{ret:i,parent_entry:r,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!0);return r==null||s==null?{ret:i,inode_obj:null}:o==null?{ret:44,inode_obj:null}:(r.contents.delete(s),{ret:0,inode_obj:o})}path_unlink_file(e){let{ret:n,path:_}=ln.from(e);if(_==null)return n;let{ret:i,parent_entry:r,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!1);return r==null||s==null||o==null?i:o.stat().filetype===Ce?31:(r.contents.delete(s),0)}path_remove_directory(e){let{ret:n,path:_}=ln.from(e);if(_==null)return n;let{ret:i,parent_entry:r,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!1);return r==null||s==null||o==null?i:!(o instanceof Je)||o.stat().filetype!==Ce?54:o.contents.size!==0?55:r.contents.delete(s)?0:44}fd_filestat_get(){return{ret:0,filestat:this.dir.stat()}}fd_filestat_set_size(e){return 8}fd_read(e){return{ret:8,data:new Uint8Array}}fd_pread(e,n){return{ret:8,data:new Uint8Array}}fd_write(e){return{ret:8,nwritten:0}}fd_pwrite(e,n){return{ret:8,nwritten:0}}constructor(e){super(),this.dir=e}},zn=class extends St{fd_prestat_get(){return{ret:0,prestat:ct.dir(this.prestat_name)}}constructor(e,n){super(new Je(n)),this.prestat_name=e}},Yn=class extends He{path_open(e,n,_){if(this.readonly&&(n&BigInt(64))==BigInt(64))return{ret:63,fd_obj:null};if((e&Tt)==Tt){if(this.readonly)return{ret:63,fd_obj:null};this.data=new Uint8Array([])}let i=new t_(this);return _&e_&&i.fd_seek(0n,ht),{ret:0,fd_obj:i}}get size(){return BigInt(this.data.byteLength)}stat(){return new In(this.ino,Sn,this.size)}constructor(e,n){super(),this.data=new Uint8Array(e),this.readonly=!!n?.readonly}},ln=class $i{static from(e){let n=new $i;if(n.is_dir=e.endsWith("/"),e.startsWith("/"))return{ret:76,path:null};if(e.includes("\0"))return{ret:28,path:null};for(let _ of e.split("/"))if(!(_===""||_===".")){if(_===".."){if(n.parts.pop()==null)return{ret:76,path:null};continue}n.parts.push(_)}return{ret:0,path:n}}to_path_string(){let e=this.parts.join("/");return this.is_dir&&(e+="/"),e}constructor(){this.parts=[],this.is_dir=!1}},Je=class t extends He{parent_ino(){return this.parent==null?He.root_ino():this.parent.ino}path_open(e,n,_){return{ret:0,fd_obj:new St(this)}}stat(){return new In(this.ino,Ce,0n)}get_entry_for_path(e){let n=this;for(let _ of e.parts){if(!(n instanceof t))return{ret:54,entry:null};let i=n.contents.get(_);if(i!==void 0)n=i;else return Ee.log(_),{ret:44,entry:null}}return e.is_dir&&n.stat().filetype!=Ce?{ret:54,entry:null}:{ret:0,entry:n}}get_parent_dir_and_entry_for_path(e,n){let _=e.parts.pop();if(_===void 0)return{ret:28,parent_entry:null,filename:null,entry:null};let{ret:i,entry:r}=this.get_entry_for_path(e);if(r==null)return{ret:i,parent_entry:null,filename:null,entry:null};if(!(r instanceof t))return{ret:54,parent_entry:null,filename:null,entry:null};let s=r.contents.get(_);return s===void 0?n?{ret:0,parent_entry:r,filename:_,entry:null}:{ret:44,parent_entry:null,filename:null,entry:null}:e.is_dir&&s.stat().filetype!=Ce?{ret:54,parent_entry:null,filename:null,entry:null}:{ret:0,parent_entry:r,filename:_,entry:s}}create_entry_for_path(e,n){let{ret:_,path:i}=ln.from(e);if(i==null)return{ret:_,entry:null};let{ret:r,parent_entry:s,filename:o,entry:a}=this.get_parent_dir_and_entry_for_path(i,!0);if(s==null||o==null)return{ret:r,entry:null};if(a!=null)return{ret:20,entry:null};Ee.log("create",i);let d;return n?d=new t(new Map):d=new Yn(new ArrayBuffer(0)),s.contents.set(o,d),a=d,{ret:0,entry:a}}constructor(e){super(),this.parent=null,e instanceof Array?this.contents=new Map(e):this.contents=e;for(let n of this.contents.values())n instanceof t&&(n.parent=this)}};function Jl(t){let e=t.replace(/\\/g,"/"),n=e.startsWith("/")?e:`/${e}`,_=[];for(let i of n.split("/"))if(!(!i||i===".")){if(i==="..")throw new Error(`wasm-clang does not allow guest path traversal: ${t}`);_.push(i)}return`/${_.join("/")}`}function Vi(t){return typeof t=="string"?new TextEncoder().encode(t):t instanceof Uint8Array?new Uint8Array(t):new Uint8Array(t)}var __=class extends qe{ino=He.issue_ino();decoder=new TextDecoder;chunks=[];output;constructor(e){super(),this.output=e}fd_filestat_get(){return{ret:oe.ERRNO_SUCCESS,filestat:new oe.Filestat(this.ino,oe.FILETYPE_CHARACTER_DEVICE,0n)}}fd_fdstat_get(){let e=new oe.Fdstat(oe.FILETYPE_CHARACTER_DEVICE,0);return e.fs_rights_base=BigInt(oe.RIGHTS_FD_WRITE),{ret:oe.ERRNO_SUCCESS,fdstat:e}}fd_write(e){let n=this.decoder.decode(e,{stream:!0});return this.chunks.push(n),this.output?.(n),{ret:oe.ERRNO_SUCCESS,nwritten:e.byteLength}}getText(){let e=this.decoder.decode();return e&&(this.chunks.push(e),this.output?.(e)),this.chunks.join("")}},nr=class{currentChunk=new Uint8Array(0);currentOffset=0;readInput;constructor(e){this.readInput=e}read(e){for(;this.currentOffset>=this.currentChunk.length;){let _=this.readInput?.();if(_==null)return new Uint8Array(0);this.currentChunk=Vi(_),this.currentOffset=0,this.currentChunk.byteLength}let n=this.currentChunk.slice(this.currentOffset,this.currentOffset+e);return this.currentOffset+=n.byteLength,n}},tr=class extends qe{ino=He.issue_ino();source;constructor(e){super(),this.source=e}fd_filestat_get(){return{ret:oe.ERRNO_SUCCESS,filestat:new oe.Filestat(this.ino,oe.FILETYPE_CHARACTER_DEVICE,0n)}}fd_fdstat_get(){let e=new oe.Fdstat(oe.FILETYPE_CHARACTER_DEVICE,0);return e.fs_rights_base=BigInt(oe.RIGHTS_FD_READ),{ret:oe.ERRNO_SUCCESS,fdstat:e}}fd_read(e){return{ret:oe.ERRNO_SUCCESS,data:this.source.read(e)}}};function r_(t={}){let e=new Je(new Map);for(let s of t.files||[]){let a=Jl(s.path).slice(1).split("/"),d=e;for(let l of a.slice(0,-1)){let c=d.contents.get(l);if(c instanceof Je){d=c;continue}let p=new Je(new Map);d.contents.set(l,p),d=p}d.contents.set(a.at(-1),new Yn(Vi(s.contents)))}let n=new nr(t.stdin),_=new __(t.stdout),i=new __(t.stderr),r=new Map([["PWD","/"]]);for(let[s,o]of Object.entries(t.env||{}))r.set(s,o);return{args:[t.programName||"main.wasm",...t.args||[]],envEntries:Array.from(r.entries()).map(([s,o])=>`${s}=${o}`),rootDirectory:e,stdout:_,stderr:i,fds:[new tr(n),_,i,new zn("/tmp",new Map),new zn("/",e.contents)]}}async function _r(t,e={}){if(t.target!=="wasm32-wasi"||t.format!=="wasi-core-wasm")throw new Error("wasm-clang currently executes only wasm32-wasi preview1 core wasm artifacts.");let n=r_({...e,programName:e.programName||t.fileName}),_=new It(n.args,n.envEntries,n.fds,{debug:!1}),i=t.bytes instanceof Uint8Array?new Uint8Array(t.bytes):new Uint8Array(t.bytes),r=t.wasm||await WebAssembly.compile(i),s={current:null},o=typeof e.extraImports=="function"?await e.extraImports({host:n,module:r,instance:s}):e.extraImports||{},a=await WebAssembly.instantiate(r,{...o,wasi_unstable:_.wasiImport,wasi_snapshot_preview1:_.wasiImport});return s.current=a,{exitCode:_.start(a),stdout:n.stdout.getText(),stderr:n.stderr.getText()}}var ji=Object.freeze({"runtime-manifest.v1.json":Object.freeze({bytes:876,sha256:"1420808d0391ff2d8a2fdf2a9f6bbce8f728e06b1ed1651029ed80b226101444"}),"bin/memfs.wasm.gz":Object.freeze({bytes:38702,sha256:"cbca9e27ceafbca840603a39fc71e4f83bfb085237c8eab84fd0401ac76806c7"}),"bin/clang.wasm.gz":Object.freeze({bytes:15721977,sha256:"b1174438d9a67b7ff11e623541b9a0572c024a9e798084b9b021dd9da2da0874"}),"bin/lld.wasm.gz":Object.freeze({bytes:7837837,sha256:"f842a9b5df3c6d326f0260bfd313c11c2e22bc8b8ae0387deede9a4af55779cd"}),"bin/sysroot.tar.gz":Object.freeze({bytes:5401380,sha256:"195e8083bace1baf86014f134a210db354cd77825988eaac7d262161cf496c4f"}),"objective-c/libobjc.a":Object.freeze({bytes:190272,sha256:"1dde20d4ce78eed271ab725062ef25f1923b20d51384943c9b8f7177eb1fc2d9"}),"objective-c/headers.json":Object.freeze({bytes:83231,sha256:"64bf5a09feffa612e6f82cfc52f3d6a9c5e4fc3064c3824c24aeea59cb544d8e"})});var i_="https://clang-wasm-assets.invalid/";function Yi(t,e){if(t.baseUrl!=null&&t.baseUrl!=="")return Zl(t);if(!e)throw new Error("baseUrl is required here. The assets that ship in this package can only be read where there is a filesystem, and a browser cannot reach a file inside an npm package - copy them somewhere your page can fetch with `npx --package @live-codes/clang-wasm clang-wasm-copy-assets <dir>` and pass that directory as baseUrl.");return Ql(e)}function Zl(t){let e;try{e=kn(t.baseUrl)}catch(_){throw new Error(`baseUrl must be an absolute http(s) URL, or relative to the page in a browser: ${_.message}`,{cause:_})}let n=t.objectiveCBaseUrl?kn(t.objectiveCBaseUrl):new URL("objective-c/",e).href;return{kind:"hosted",key:`${e}\0${n}`,baseUrl:e,objectiveCBaseUrl:n,description:e,async loadManifest(){return K_(q_(e))},readAsset:_=>nc(new URL(_,e),_),installFetch(){}}}function Ql(t){let e={kind:"packaged",key:`packaged\0${t.root.href}`,baseUrl:i_,objectiveCBaseUrl:new URL("objective-c/",i_).href,description:`the assets packaged with this library (${t.root.href})`,readAsset:n=>tc(t,n),async loadManifest(){let n=await e.readAsset("runtime-manifest.v1.json");return zt(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(n)))},installFetch:()=>ec(e)};return e}var zi=null;function ec(t){if(zi===t)return;let e=globalThis.fetch;globalThis.fetch=(n,_)=>{let i=typeof n=="string"?n:n instanceof URL?n.href:n?.url??"";return i.startsWith(i_)?t.readAsset(i.slice(i_.length)).then(r=>new Response(r)):e.call(globalThis,n,_)},zi=t}async function nc(t,e){let n=await fetch(t);if(!n.ok){let i=await fetch(`${t}.gz`);if(!i.ok)throw new Error(`Failed to load the runtime asset ${t}: ${n.status}`);n=i}let _=new Uint8Array(await n.arrayBuffer());return Ki(e,_c(_)?await rc(_,e):_)}async function tc(t,e){let n;try{n=await t.readFile(e)}catch(_){throw new Error(`Failed to read the packaged asset ${e} from ${t.root.href}: ${_.message}`,{cause:_})}return Ki(e,n)}async function Ki(t,e){let n=ji[t];if(!n)throw new Error(`No pinned receipt for the runtime asset ${t}`);if(e.byteLength!==n.bytes)throw new Error(`The runtime asset ${t} is ${e.byteLength} bytes, expected ${n.bytes}`);let _=await ic(e);if(_!==n.sha256)throw new Error(`The runtime asset ${t} failed SHA-256 verification: expected ${n.sha256}, got ${_}`);return e}var _c=t=>t.byteLength>2&&t[0]===31&&t[1]===139;async function rc(t,e){if(typeof DecompressionStream!="function")throw new Error(`Inflating the runtime asset ${e} needs DecompressionStream`);let n=new Blob([t]).stream().pipeThrough(new DecompressionStream("gzip"));return new Uint8Array(await new Response(n).arrayBuffer())}async function ic(t){let e=globalThis.crypto?.subtle;if(!e)throw new Error("Verifying the runtime assets needs crypto.subtle: a secure context in the browser, or Node 20 and later.");let n=await e.digest("SHA-256",t);return[...new Uint8Array(n)].map(_=>_.toString(16).padStart(2,"0")).join("")}var sc=128*1024*1024,s_=new Map;async function qi(t,e={}){let n=s_.get(t.key);n||(n=ac(t,e).catch(i=>{throw s_.delete(t.key),i}),s_.set(t.key,n));let _=await n;return _.references+=1,e.onProgress&&_.progressSinks.add(e.onProgress),_}function Ji(t,e){e&&t.progressSinks.delete(e),t.references-=1,t.references<=0&&s_.delete(t.key)}async function Zi(t,e){let n=t.queue,_;t.queue=new Promise(i=>{_=i}),await n;try{return await e()}finally{_()}}async function Qi(t,e){let{runtime:n}=t,_=n.log,i=t.compilerOutput,r=[];n.log=!0,t.compilerOutput=a=>r.push(a);let s,o=null;try{s=await e()}catch(a){o=a}finally{t.compilerOutput=i,n.log=_}return{result:s,raw:r.join(""),error:o}}function oc(){typeof globalThis.SharedArrayBuffer>"u"&&(globalThis.SharedArrayBuffer=class{})}async function ac(t,e){oc();let n={key:t.key,source:t,references:0,queue:Promise.resolve(),progressSinks:new Set,runtime:null,objectiveCRuntime:{pending:null,builds:0},compilerOutput:()=>{}},_;try{_=await t.loadManifest()}catch(r){throw new Error(`Failed to load the runtime manifest from ${t.description}: ${r.message}`,{cause:r})}t.installFetch();let i=new Y_({runtimeBaseUrl:t.baseUrl,manifest:_,stdin:()=>"",stdout:r=>n.compilerOutput(r),progress:r=>{for(let s of n.progressSinks)s(r)},maxAssetBytes:e.maxAssetBytes??sc});return await i.ready,n.runtime=i,n}var es=(t,e,n)=>{let _=e.split("/").slice(0,-1),i="";for(let r of _){i=i?`${i}/${r}`:r;try{t.memfs.addDirectory(i)}catch{}}t.memfs.addFile(e,n)};async function ns(t,e={}){let n=[],_=[],i=r_({args:e.args??[],env:e.env??{},files:e.files??[],programName:e.programName,stdin:e.stdin,stdout:a=>n.push(a),stderr:a=>_.push(a)}),r=new It(i.args,i.envEntries,i.fds,{debug:!1}),s=await WebAssembly.instantiate(t,{wasi_snapshot_preview1:r.wasiImport,wasi_unstable:r.wasiImport});return{exitCode:r.start(s),stdout:n.join(""),stderr:_.join(""),readFile:a=>dc(i,a)}}function dc(t,e){let n=String(e).replaceAll("\\","/").split("/").filter(r=>r&&r!=="."&&r!==".."),_=t.rootDirectory;for(let r of n)if(_=_?.contents?.get(r),!_)return null;let i=_?.data;return i instanceof Uint8Array?new Uint8Array(i):i instanceof ArrayBuffer?new Uint8Array(i):null}function ts({packaged:t}){async function e(n={}){let _=Yi(n,t),i=await qi(_,n),r=!1;return{runtime:i.runtime,assetSource:_.description,addFile:(s,o)=>es(i.runtime,s,o),lock:s=>Zi(i,s),captureCompilerOutput:s=>Qi(i,s),runCommand:(s,o)=>ns(s,o),execute:(s,o)=>_r(s,o),dispose(){r||(r=!0,Ji(i,n.onProgress))}}}return{createToolchain:e}}var lc=/\u001b\[[0-9;]*[A-Za-z]/g,cc=t=>String(t??"").replace(lc,""),fc=/^\s*>|^\s*done\.?\s*$/,rr=t=>cc(t).split(/\r?\n/).map(e=>e.replace(/\s+$/,"")).filter(e=>e&&!fc.test(e));var ir=Object.freeze(["-fgnuc-version=4.2.1"]);var{createToolchain:_s}=ts({packaged:null});var rs="include/wasm32-wasi/signal.h",is=`/* Minimal <signal.h> supplied by the Nim playground.
   The runtime's WASI sysroot has no signal.h; Nim's system module needs one to compile. WASI has no
   signals, so nothing here ever runs. */
#ifndef NIM_WASI_SIGNAL_SHIM_H
#define NIM_WASI_SIGNAL_SHIM_H

#ifdef __cplusplus
extern "C" {
#endif

typedef int sig_atomic_t;

typedef void (*nim_signal_handler_t)(int);

#ifndef SIG_DFL
#define SIG_DFL ((nim_signal_handler_t)0)
#endif
#ifndef SIG_IGN
#define SIG_IGN ((nim_signal_handler_t)1)
#endif
#ifndef SIG_ERR
#define SIG_ERR ((nim_signal_handler_t)-1)
#endif

#ifndef SIGHUP
#define SIGHUP 1
#endif
#ifndef SIGINT
#define SIGINT 2
#endif
#ifndef SIGQUIT
#define SIGQUIT 3
#endif
#ifndef SIGILL
#define SIGILL 4
#endif
#ifndef SIGTRAP
#define SIGTRAP 5
#endif
#ifndef SIGABRT
#define SIGABRT 6
#endif
#ifndef SIGBUS
#define SIGBUS 7
#endif
#ifndef SIGFPE
#define SIGFPE 8
#endif
#ifndef SIGKILL
#define SIGKILL 9
#endif
#ifndef SIGUSR1
#define SIGUSR1 10
#endif
#ifndef SIGSEGV
#define SIGSEGV 11
#endif
#ifndef SIGUSR2
#define SIGUSR2 12
#endif
#ifndef SIGPIPE
#define SIGPIPE 13
#endif
#ifndef SIGALRM
#define SIGALRM 14
#endif
#ifndef SIGTERM
#define SIGTERM 15
#endif

/* static, so every translation unit gets its own copy and there is no duplicate symbol at link time. */
static __attribute__((unused)) nim_signal_handler_t signal(int signum, nim_signal_handler_t handler) {
	(void)signum;
	(void)handler;
	return SIG_DFL;
}

/* Nim's handler re-raises after restoring the default disposition. Because signal() above never
   actually installs anything, not raising is the correct no-op. */
static __attribute__((unused)) int raise(int signum) {
	(void)signum;
	return 0;
}

#ifdef __cplusplus
}
#endif

#endif
`;var uc="include/nimbase.h",pc=/\bint\s+main\s*\(/,hc=/int\s+main\s*\(\s*int\s+(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*\)\s*\{/,mc=t=>t.replace(hc,`int main(int $1, char** $2) {
	char** $3 = (char**)0;`);function os({baseUrl:t,onProgress:e}){return _s({baseUrl:t,onProgress:e})}var Tc=["addFile","lock","captureCompilerOutput","execute"],as=t=>{if(!t||typeof t!="object")throw new Error("`toolchain` needs the object `createToolchain()` returns from `@live-codes/clang-wasm/toolchain`.");let e=Tc.filter(n=>typeof t[n]!="function");if(!t.runtime||e.length)throw new Error("`toolchain` is not a toolchain: "+(e.length?`no ${e.join(", ")}`:"no runtime")+". It should come from `createToolchain()` in `@live-codes/clang-wasm/toolchain`.");return t},ss=new WeakSet,gc=(t,e)=>{ss.has(t.runtime)||(t.addFile(rs,is),t.addFile(uc,e),ss.add(t.runtime))};async function ds(t,{translationUnits:e,nimbase:n,onCompilerOutput:_=()=>{}}){if(gc(t,n),!e.length)throw new Error("Nothing to compile: Nim produced no C files.");let i=Math.max(0,e.findIndex(l=>pc.test(l.content))),r=e[i],s=e.filter((l,c)=>c!==i),{result:o,raw:a,error:d}=await t.lock(()=>t.captureCompilerOutput(()=>t.runtime.compileArtifact(mc(r.content),{language:"C",fileName:r.path,workspaceFiles:s.map(({path:l,content:c})=>({path:l,content:c})),compileArgs:[...ir]})));if(_(a),d){let l=rr(a);throw new Error(l.length?l.join(`
`):String(d?.message??d))}return o}var ls=(t,e,{args:n=[],stdin:_,onStdout:i=()=>{},onStderr:r=()=>{}})=>t.execute(e,{args:n,stdin:Ic(_),stdout:i,stderr:r}),Ic=t=>{if(t==null||t.length===0)return()=>null;let e=!1;return()=>e?null:(e=!0,t)};var Sc=/\u001b\[[0-9;]*[A-Za-z]/g,o_=t=>String(t??"").replace(Sc,""),cs=t=>o_(t).split(/\r?\n/).map(e=>e.replace(/\s+$/,"")).filter(e=>e.trim());var Be=Object.freeze({WASM:"wasm",JS:"js"}),Ac=new Map([["wasm",Be.WASM],["c",Be.WASM],["nim-wasm",Be.WASM],["js",Be.JS],["javascript",Be.JS],["nodejs",Be.JS]]);function fs(t){let e=Ac.get(String(t??"").trim().toLowerCase());if(!e)throw new Error(`Unknown target ${JSON.stringify(t)}. Expected one of: ${Object.values(Be).join(", ")}.`);return e}var us=Be.WASM;function ps({packaged:t,acquireNimCompiler:e,executeJavaScript:n}){async function _(i={}){let r=fs(i.target??us),s=fr(i,t),o=i.onLog??(()=>{}),a=i.onStatus??(()=>{}),{compiler:d,release:l}=await e({source:s,onStatus:a}),c=!1,p=()=>{let E=d.takeOutput();return E.trim()&&o(E,"nim"),cs(E)},f=i.toolchain?as(i.toolchain):null,T=null,I=()=>(T||(T=f?Promise.resolve(f):os({baseUrl:i.clangBaseUrl,onProgress:i.onProgress})),T),m=null,A=()=>(m||(m=s.readAsset("nimbase.h").then(E=>new TextDecoder("utf-8",{fatal:!0}).decode(E))),m),b=(E,u,g="The Nim compiler produced no output.")=>({ok:!1,stdout:"",stderr:"",output:"",errors:u.length?u:[g],exitCode:null,compileMs:E,runMs:null});return{target:r,assetSource:s.description,async run(E,u="",g={}){if(c)throw new Error("This compiler has been disposed.");if(typeof E!="string")throw new Error("run() needs the program source as its first argument.");let h=performance.now();if(r===Be.JS){let G=d.compileToJs(E,i.compileArgs??[]),K=Math.round(performance.now()-h);if(!G.ok)return b(K,p());let me=[],ae=[],de=g.onOutput??i.onOutput??(()=>{}),ne=(ke,_e)=>C=>{ke.push(C),de(C,_e)};if(g.execute===!1)return{ok:!0,stdout:"",stderr:"",output:"",errors:[],exitCode:null,compileMs:K,runMs:null,compiledCode:G.js};a("running\u2026");let ge=performance.now(),he=await n(G.js,{onStdout:ne(me),onStderr:ne(ae)});return{ok:!he.failed,stdout:he.stdout,stderr:he.stderr,output:he.output,errors:[],exitCode:he.failed?1:0,compileMs:K,runMs:Math.round(performance.now()-ge),compiledCode:G.js}}let y=d.compileToC(E,i.compileArgs??[]),S=Math.round(performance.now()-h);if(!y.ok)return b(S,p());let N=y.files.map((G,K)=>({path:`nim/unit-${String(K).padStart(3,"0")}.c`,content:G.content})),x=await I();a(`compiling ${N.length} translation units\u2026`);let M=performance.now(),W;try{W=await ds(x,{translationUnits:N,nimbase:await A(),onCompilerOutput:G=>o(o_(G),"clang")})}catch(G){return{ok:!1,stdout:"",stderr:"",output:"",errors:[o_(G?.message??G)],exitCode:null,compileMs:Math.round(performance.now()-M),runMs:null}}let Y=Math.round(performance.now()-M);a("running\u2026");let k=[],L=[],B=[],D=g.onOutput??i.onOutput??(()=>{}),$=performance.now(),P=await ls(x,W,{args:g.args??i.args??[],stdin:u,onStdout:G=>{k.push(G),B.push(G),D(G,"out")},onStderr:G=>{L.push(G),B.push(G),D(G,"err")}});return{ok:P.exitCode===0,stdout:k.join(""),stderr:L.join(""),output:B.join(""),errors:[],exitCode:P.exitCode,compileMs:S+Y,runMs:Math.round(performance.now()-$)}},async dispose(){c||(c=!0,l(),T&&!f&&await T.then(E=>E.dispose(),()=>{}))}}}return{createCompiler:_,TARGETS:Be,targets:Object.values(Be)}}var yc=`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  var SOURCE = 'nim-playground';
  var send = function (kind, text) {
    parent.postMessage({ source: SOURCE, kind: kind, text: text }, '*');
  };
  var format = function (values) {
    return Array.prototype.map
      .call(values, function (value) {
        if (typeof value === 'string') return value;
        try {
          return JSON.stringify(value);
        } catch (error) {
          return String(value);
        }
      })
      .join(' ');
  };

  // Nim's runtime writes to stdout through console.log and to stderr through console.error, so these
  // are the two that matter; the rest are routed to stderr so nothing is silently lost.
  console.log = function () { send('out', format(arguments)); };
  console.info = console.log;
  console.debug = console.log;
  console.warn = function () { send('err', format(arguments)); };
  console.error = function () { send('err', format(arguments)); };

  window.onerror = function (message, source, line) {
    send('err', String(message) + ' (line ' + line + ')');
    return true;
  };

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.source !== SOURCE || data.kind !== 'run') return;
    try {
      var script = document.createElement('script');
      // Appending the element is what runs it, and it runs synchronously, so the program has finished
      // by the time the next line reports it.
      script.textContent = data.text;
      document.body.appendChild(script);
    } catch (error) {
      send('err', 'Error: ' + (error && error.message ? error.message : error));
    }
    send('done', '');
  });

  send('ready', '');
})();
<\/script>
</body>
</html>
`,hs="nim-playground";function ms(t,{timeoutMs:e=15e3,onStdout:n=()=>{},onStderr:_=()=>{}}={}){return new Promise(i=>{let r=document.createElement("iframe");r.setAttribute("sandbox","allow-scripts"),r.setAttribute("title","Nim program output"),r.style.display="none",r.srcdoc=yc;let s=[],o=[],a=[],d=!1,l=f=>{d||(d=!0,clearTimeout(c),window.removeEventListener("message",p),r.remove(),i({stdout:s.join(`
`),stderr:o.join(`
`),output:a.join(`
`),failed:f}))},c=setTimeout(()=>{o.push(`Timed out after ${e}ms waiting for the program to finish.`),a.push(`Timed out after ${e}ms waiting for the program to finish.`),l(!0)},e),p=f=>{let T=f.data;if(!(!T||T.source!==hs||f.source!==r.contentWindow)){if(T.kind==="ready"){r.contentWindow.postMessage({source:hs,kind:"run",text:t},"*");return}if(T.kind==="out"){s.push(T.text),a.push(T.text),n(`${T.text}
`);return}if(T.kind==="err"){o.push(T.text),a.push(T.text),_(`${T.text}
`);return}T.kind==="done"&&l(!1)}};window.addEventListener("message",p),document.body.appendChild(r)})}var sr="/tmp/nimcache",a_="/tmp/user.nim",Ec=[a_,"/tmp/user","/tmp/user.js"],gs=Object.freeze(["--hints:off","-d:release",`--nimcache:${sr}`,"--path:/lib/pure","--path:/lib/pure/collections","--path:/lib/core"]),Nc=Object.freeze(["c",...gs,"-d:useMalloc","--compileOnly","-o:/tmp/user",a_]),bc=Object.freeze(["js",...gs,"--path:/lib/js","-o:/tmp/user.js",a_]),xc=/\.(?:c|cpp)$/,Is=(t,e)=>{try{return t.readdir(e).filter(n=>n!=="."&&n!=="..")}catch{return[]}},wc=(t,e=sr)=>Is(t,e).filter(n=>xc.test(n)).sort().map(n=>({name:n,content:t.readFile(`${e}/${n}`,{encoding:"utf8"})})),Lc=(t,e=sr)=>{for(let n of Is(t,e))try{t.unlink(`${e}/${n}`)}catch{}for(let n of Ec)try{t.unlink(n)}catch{}},Ts=(t,e)=>{if(!e.length)return t;let n=t.indexOf(a_);return[...t.slice(0,n),...e,...t.slice(n)]};function Ss({FS:t,callMain:e,global:n=globalThis}){let _=(i,r)=>{Lc(t),n.__NIM_USER_CODE__=i,n.__NIM_USER_CODE_PENDING__=i;try{return e([...r])}catch(s){return`threw: ${s?.message??s}`}};return{compileToC(i,r=[]){let s=_(i,Ts(Nc,r)),o=wc(t);return{files:o,exitCode:s,ok:s===0&&o.length>0}},compileToJs(i,r=[]){let s=_(i,Ts(bc,r)),o="";try{o=t.readFile("/tmp/user.js",{encoding:"utf8"})}catch{}return{js:o,exitCode:s,ok:s===0&&o.length>0}}}}var Rc=t=>{if(typeof importScripts=="function")try{return importScripts(t),Promise.resolve()}catch(e){return Promise.reject(new Error(`Failed to load ${t}: ${e?.message??e}`))}return new Promise((e,n)=>{let _=document.createElement("script");_.src=t,_.onload=()=>e(),_.onerror=()=>n(new Error(`Failed to load ${t}`)),document.head.appendChild(_)})},Kn=new Map;async function As({source:t,onStatus:e=()=>{}}){let n=Kn.get(t.key);n||(n={references:0,pending:null},n.pending=Cc({source:t,onStatus:e}).catch(i=>{throw Kn.get(t.key)===n&&Kn.delete(t.key),i}),Kn.set(t.key,n));let _=await n.pending;return n.references+=1,{compiler:_,release(){n.references-=1,n.references<=0&&Kn.get(t.key)===n&&Kn.delete(t.key)}}}async function Cc({source:t,onStatus:e}){let n,_=new Promise((s,o)=>{n={resolve:s,reject:o}}),i=[];return globalThis.Nim={locateFile:s=>t.locateFile(s),noInitialRun:!0,print:s=>i.push(s),printErr:s=>i.push(s),quit:(s,o)=>{throw o},onRuntimeInitialized:()=>n.resolve(),onAbort:s=>n.reject(new Error(`Nim compiler aborted: ${s}`))},e("loading the Nim compiler\u2026"),await Rc(t.bundleUrl),await _,{...Ss({FS:globalThis.FS,callMain:globalThis.callMain}),takeOutput(){let s=i.join("");return i.length=0,s}}}var ys=ps({packaged:null,acquireNimCompiler:As,executeJavaScript:ms}),vc=ys.createCompiler,{TARGETS:Mc,targets:Dc}=ys;return vs(Pc);})();
