(function(){"use strict";var t={6228:function(t,e,o){var r=o(5130),i=o(8950),a=o(292),s=o(4996),l=o(6768);const n={id:"app"},d={class:"navbar"},c={key:0,class:"social-links"},u={key:1,class:"navbar-items"};function p(t,e,o,r,i,a){const s=(0,l.g2)("router-link"),p=(0,l.g2)("router-view"),m=(0,l.g2)("FooterComponent");return(0,l.uX)(),(0,l.CE)("div",n,[(0,l.Lk)("nav",d,[(0,l.bF)(s,{class:"navbar-logo",to:"/"},{default:(0,l.k6)((()=>e[1]||(e[1]=[(0,l.eW)("IndyMamaDeals")]))),_:1}),t.isAuthenticated?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("div",c,e[2]||(e[2]=[(0,l.Lk)("a",{href:"https://www.facebook.com/indycouponmama"},"Facebook",-1),(0,l.Lk)("a",{href:"https://instagram.com/indy_mama_deals"},"Instagram",-1)]))),t.isAuthenticated?((0,l.uX)(),(0,l.CE)("div",u,[t.isAuthenticated?((0,l.uX)(),(0,l.Wv)(s,{key:0,to:"/find-store-product"},{default:(0,l.k6)((()=>e[3]||(e[3]=[(0,l.eW)("Add Store Product")]))),_:1})):(0,l.Q3)("",!0),t.isAuthenticated?((0,l.uX)(),(0,l.Wv)(s,{key:1,to:"/find-product"},{default:(0,l.k6)((()=>e[4]||(e[4]=[(0,l.eW)("Add Amazon Product")]))),_:1})):(0,l.Q3)("",!0),t.isAuthenticated?((0,l.uX)(),(0,l.CE)("button",{key:2,class:"logout-btn",onClick:e[0]||(e[0]=(...e)=>t.logout&&t.logout(...e))}," Logout ")):(0,l.Q3)("",!0)])):(0,l.Q3)("",!0)]),(0,l.bF)(p),(0,l.bF)(m)])}const m={class:"footer-component"};function h(t,e){return(0,l.uX)(),(0,l.CE)("div",m,e[0]||(e[0]=[(0,l.Lk)("p",null," Disclaimer - We are a part of the Amazon Services LLC Associates program and do earn a small compensation when you shop and purchase from qualifying links. You will find links from Amazon and multiple stores that are our affiliate links. These links at no extra cost to you provide us a small commission when you shop and purchase from them ",-1),(0,l.Lk)("p",null,"© 2025 IndyMamaDeals. All rights reserved.",-1)]))}var f=o(1241);const k={},g=(0,f.A)(k,[["render",h]]);var b=g,v=o(782),L={name:"App",components:{FooterComponent:b},computed:{...(0,v.aH)(["isAuthenticated"])},methods:{...(0,v.i0)(["logout"])}};const y=(0,f.A)(L,[["render",p],["__scopeId","data-v-8117e9a2"]]);var w=y,P=o(1387),F=o(4232);const A={class:"homepage-container"},D={class:"posts-container"},U={class:"post-img-title"},E=["src"],C={class:"post-title"},_={class:"post-info-holder"},x={class:"post-description"},S={class:"post-actions"},I=["onClick"],X={key:0,class:"user-controls"},V=["onClick"],$=["onClick"],q={key:0,class:"modal-overlay"},J={class:"modal-content"};function O(t,e,o,r,i,a){return(0,l.uX)(),(0,l.CE)("div",A,[(0,l.Lk)("div",D,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(t.posts,(e=>((0,l.uX)(),(0,l.CE)("div",{class:"post-card",key:e.title},[(0,l.Lk)("div",U,[(0,l.Lk)("img",{src:e.image_url,alt:"Product Image",class:"post-image"},null,8,E),(0,l.Lk)("h3",C,(0,F.v_)(e.title),1)]),(0,l.Lk)("div",_,[(0,l.Lk)("p",x,(0,F.v_)(e.description),1),(0,l.Lk)("div",S,[(0,l.Lk)("button",{class:"visit-link-btn",onClick:t=>a.goToLink(e.link_url)}," Visit Product ",8,I),t.isAuthenticated&&e.author_id===t.user.id?((0,l.uX)(),(0,l.CE)("div",X,[(0,l.Lk)("button",{class:"edit-btn",onClick:t=>a.goToEditPage(e.id)}," Edit ",8,V),(0,l.Lk)("button",{class:"delete-btn",onClick:t=>a.openDeleteModal(e.id)}," Delete ",8,$)])):(0,l.Q3)("",!0)])])])))),128))]),i.showDeleteModal?((0,l.uX)(),(0,l.CE)("div",q,[(0,l.Lk)("div",J,[e[2]||(e[2]=(0,l.Lk)("h3",null,"Are you sure you want to delete this post?",-1)),(0,l.Lk)("button",{onClick:e[0]||(e[0]=(...t)=>a.confirmDelete&&a.confirmDelete(...t)),class:"confirm-delete-btn"}," Yes, Delete "),(0,l.Lk)("button",{onClick:e[1]||(e[1]=t=>i.showDeleteModal=!1),class:"cancel-delete-btn"}," Cancel ")])])):(0,l.Q3)("",!0)])}o(4114);var T={name:"HomePage",data(){return{showDeleteModal:!1,selectedPostId:null}},computed:{...(0,v.aH)(["posts","user","isAuthenticated"])},methods:{...(0,v.i0)(["fetchPosts","deletePost"]),goToLink(t){console.log("Navigating to:",t),window.open(t)},goToEditPage(t){this.$router.push({name:"EditProductPage",params:{id:t}})},openDeleteModal(t){this.selectedPostId=t,this.showDeleteModal=!0},async confirmDelete(){try{await this.deletePost(this.selectedPostId),this.showDeleteModal=!1,console.log(`Deleted post with ID: ${this.selectedPostId}`)}catch(t){console.error("Failed to delete post:",t)}}},created(){this.fetchPosts()}};const Q=(0,f.A)(T,[["render",O],["__scopeId","data-v-3dcbbdba"]]);var M=Q;const N={class:"find-product-form-container"},j={class:"preview-form-structure"},W={key:0,class:"preview-post-structure"},z={class:"top-preview"},H=["src"],R={class:"preview-title"},Y={class:"bottom-preview"},G={class:"preview-description"},K={class:"preview-price"},Z=["placeholder"],B=["placeholder"],tt=["placeholder"],et={key:2};function ot(t,e,o,i,a,s){return(0,l.uX)(),(0,l.CE)("div",N,[e[16]||(e[16]=(0,l.Lk)("h1",null,"Find Amazon Product",-1)),a.product&&a.product.title?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("form",{key:0,onSubmit:e[1]||(e[1]=(0,r.D$)(((...t)=>s.fetchProductDetails&&s.fetchProductDetails(...t)),["prevent"])),class:"fetch-form"},[(0,l.Lk)("div",null,[e[8]||(e[8]=(0,l.Lk)("label",{for:"affiliate-link"},"Affiliate Link:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>a.affiliateLink=t),id:"affiliate-link",placeholder:"Paste your Amazon affiliate link here",required:""},null,512),[[r.Jo,a.affiliateLink]])]),e[9]||(e[9]=(0,l.Lk)("button",{class:"fetch-product-btn",type:"submit"}," Fetch Product Details ",-1))],32)),(0,l.Lk)("div",j,[a.postForm.title?((0,l.uX)(),(0,l.CE)("div",W,[(0,l.Lk)("div",z,[(0,l.Lk)("img",{class:"preview-img",src:a.postForm.imageUrl||"",alt:"Product Image"},null,8,H),(0,l.Lk)("p",R,(0,F.v_)(a.postForm.title||""),1)]),(0,l.Lk)("div",Y,[(0,l.Lk)("p",G,(0,F.v_)(a.postForm.description||""),1),(0,l.Lk)("p",K,(0,F.v_)(a.postForm.price||""),1)])])):(0,l.Q3)("",!0),a.product&&a.product.title?((0,l.uX)(),(0,l.CE)("form",{key:1,onSubmit:e[7]||(e[7]=(0,r.D$)(((...t)=>s.submitForm&&s.submitForm(...t)),["prevent"])),class:"add-post-form"},[(0,l.Lk)("div",null,[e[10]||(e[10]=(0,l.Lk)("label",{for:"title"},"Title:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":e[2]||(e[2]=t=>a.postForm.title=t),placeholder:a.product?.title||"",required:""},null,8,Z),[[r.Jo,a.postForm.title]])]),(0,l.Lk)("div",null,[e[11]||(e[11]=(0,l.Lk)("label",{for:"price"},"Price:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"price","onUpdate:modelValue":e[3]||(e[3]=t=>a.postForm.price=t),placeholder:a.product?.price||"Price unavailable",required:""},null,8,B),[[r.Jo,a.postForm.price]])]),(0,l.Lk)("div",null,[e[12]||(e[12]=(0,l.Lk)("label",{for:"description"},"Description:",-1)),(0,l.bo)((0,l.Lk)("textarea",{id:"description","onUpdate:modelValue":e[4]||(e[4]=t=>a.postForm.description=t),placeholder:"Product Description",required:""},null,512),[[r.Jo,a.postForm.description]])]),(0,l.Lk)("div",null,[e[13]||(e[13]=(0,l.Lk)("label",{for:"image"},"Image URL: DON'T CHANGE!",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"image","onUpdate:modelValue":e[5]||(e[5]=t=>a.postForm.imageUrl=t),placeholder:a.product?.imageUrl||"",required:""},null,8,tt),[[r.Jo,a.postForm.imageUrl]])]),(0,l.Lk)("div",null,[e[14]||(e[14]=(0,l.Lk)("label",{for:"link"},"Product Link: DON'T CHANGE!",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"link","onUpdate:modelValue":e[6]||(e[6]=t=>a.affiliateLink=t),required:""},null,512),[[r.Jo,a.affiliateLink]])]),e[15]||(e[15]=(0,l.Lk)("button",{class:"submit-btn",type:"submit"}," Submit Post ",-1))],32)):(0,l.Q3)("",!0),a.error?((0,l.uX)(),(0,l.CE)("p",et,(0,F.v_)(a.error),1)):(0,l.Q3)("",!0)])])}var rt=o(4373),it={data(){return{affiliateLink:"",product:{},error:null,postForm:{title:"",price:"",description:"",imageUrl:""}}},methods:{...(0,v.i0)(["submitPost"]),extractASIN(t){const e=/([A-Z0-9]{10})(?:[/?]|$)/,o=t.match(e);return o?o[1]:null},async fetchProductDetails(){this.error=null,this.product=null;const t=this.extractASIN(this.affiliateLink);if(t)try{const e=await rt.A.post("/fetch-product-details",{asin:t});this.product=e.data,this.postForm.title=this.product?.title||"",this.postForm.price=this.product?.price||"Price unavailable",this.postForm.imageUrl=this.product?.imageUrl||""}catch(e){console.error("Failed to fetch product details:",e),this.error="Failed to fetch product details. Please try again."}else this.error="Invalid Amazon link. Could not extract ASIN."},async submitPost({state:t},e){if(console.log(this.$store.state),console.log("isAuthenticated:",t.isAuthenticated),!t.isAuthenticated)throw new Error("User is not authenticated");try{const t=await rt.A.post("/api/submit-post",e);return t.data}catch(o){throw console.error("Failed to submit post:",o),o}},async submitForm(){try{await this.$store.dispatch("submitPost",{title:this.postForm.title,price:this.postForm.price,description:this.postForm.description,image_url:this.postForm.imageUrl,link_url:this.affiliateLink}),this.$router.push("/")}catch(t){console.error("Error submitting post:",t),this.error="Failed to submit post. Please try again."}}}};const at=(0,f.A)(it,[["render",ot]]);var st=at;const lt={class:"login-form-container"},nt={class:"label-input"},dt={class:"label-input"},ct=["disabled"],ut={key:0};function pt(t,e,o,i,a,s){return(0,l.uX)(),(0,l.CE)("div",lt,[e[5]||(e[5]=(0,l.Lk)("h1",null,"Login",-1)),(0,l.Lk)("form",{onSubmit:e[2]||(e[2]=(0,r.D$)(((...t)=>s.handleLogin&&s.handleLogin(...t)),["prevent"])),class:"login-form"},[(0,l.Lk)("div",nt,[e[3]||(e[3]=(0,l.Lk)("label",{for:"email"},"Email",-1)),(0,l.bo)((0,l.Lk)("input",{type:"email","onUpdate:modelValue":e[0]||(e[0]=t=>a.email=t),id:"email",required:"",autocomplete:"email"},null,512),[[r.Jo,a.email]])]),(0,l.Lk)("div",dt,[e[4]||(e[4]=(0,l.Lk)("label",{for:"password"},"Password",-1)),(0,l.bo)((0,l.Lk)("input",{type:"password","onUpdate:modelValue":e[1]||(e[1]=t=>a.password=t),id:"password",required:"",autocomplete:"current-password"},null,512),[[r.Jo,a.password]])]),(0,l.Lk)("button",{type:"submit",disabled:a.loading,class:"log-in-btn"}," Login ",8,ct)],32),a.error?((0,l.uX)(),(0,l.CE)("p",ut,(0,F.v_)(a.error),1)):(0,l.Q3)("",!0)])}var mt={data(){return{email:"",password:"",error:null,loading:!1}},methods:{...(0,v.i0)(["login"]),async handleLogin(){console.log("Login button clicked"),this.loading=!0;try{this.error=null;const t={email:this.email,password:this.password};console.log("Credentials:",t),await this.login(t),console.log("Login successful"),console.log("Vuex state after login:",this.$store.state),this.$router.push("/")}catch(t){console.error("Login failed:",t),this.error=t.message}finally{this.loading=!1}}}};const ht=(0,f.A)(mt,[["render",pt]]);var ft=ht;const kt={class:"edit-product-container"},gt={class:"form-group"},bt={class:"form-group"},vt={class:"form-group"},Lt={class:"form-group"},yt={class:"form-group"};function wt(t,e,o,i,a,s){return(0,l.uX)(),(0,l.CE)("div",kt,[e[12]||(e[12]=(0,l.Lk)("h1",null,"Edit Product",-1)),(0,l.Lk)("form",{onSubmit:e[5]||(e[5]=(0,r.D$)(((...t)=>s.submitEditForm&&s.submitEditForm(...t)),["prevent"])),class:"edit-product-form"},[(0,l.Lk)("div",gt,[e[6]||(e[6]=(0,l.Lk)("label",{for:"title"},"Title:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":e[0]||(e[0]=t=>a.editForm.title=t),required:""},null,512),[[r.Jo,a.editForm.title]])]),(0,l.Lk)("div",bt,[e[7]||(e[7]=(0,l.Lk)("label",{for:"price"},"Price:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"price","onUpdate:modelValue":e[1]||(e[1]=t=>a.editForm.price=t),required:""},null,512),[[r.Jo,a.editForm.price]])]),(0,l.Lk)("div",vt,[e[8]||(e[8]=(0,l.Lk)("label",{for:"description"},"Description:",-1)),(0,l.bo)((0,l.Lk)("textarea",{id:"description","onUpdate:modelValue":e[2]||(e[2]=t=>a.editForm.description=t),rows:"5",required:""},null,512),[[r.Jo,a.editForm.description]])]),(0,l.Lk)("div",Lt,[e[9]||(e[9]=(0,l.Lk)("label",{for:"imageUrl"},"Image URL:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"imageUrl","onUpdate:modelValue":e[3]||(e[3]=t=>a.editForm.image_url=t),required:""},null,512),[[r.Jo,a.editForm.image_url]])]),(0,l.Lk)("div",yt,[e[10]||(e[10]=(0,l.Lk)("label",{for:"linkUrl"},"Product Link:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"linkUrl","onUpdate:modelValue":e[4]||(e[4]=t=>a.editForm.link_url=t),required:""},null,512),[[r.Jo,a.editForm.link_url]])]),e[11]||(e[11]=(0,l.Lk)("button",{type:"submit",class:"save-btn"}," Save Changes ",-1))],32)])}var Pt={name:"EditProductPage",props:["id"],data(){return{editForm:{title:"",price:"",description:"",image_url:"",link_url:""},error:null}},methods:{...(0,v.i0)(["fetchSinglePost","updatePost"]),async loadPostData(){const t=this.$route.params.id;try{const e=await this.fetchSinglePost(t);this.editForm={...e}}catch(e){console.error("Failed to load product data:",e),this.error="Failed to load product data. Please try again."}},async submitEditForm(){const t=this.$route.params.id;try{await this.updatePost({id:t,...this.editForm}),this.$router.push("/")}catch(e){console.error("Failed to update product:",e),this.error="Failed to update product. Please try again."}}},created(){this.loadPostData()}};const Ft=(0,f.A)(Pt,[["render",wt],["__scopeId","data-v-1776f3d5"]]);var At=Ft;const Dt={class:"add-new-post-container"},Ut={class:"form-group"},Et={class:"form-group"},Ct={class:"form-group"},_t={class:"form-group"},xt={class:"form-group"},St={key:0,class:"error-message"};function It(t,e,o,i,a,s){return(0,l.uX)(),(0,l.CE)("div",Dt,[e[12]||(e[12]=(0,l.Lk)("h1",null,"Create a New Post",-1)),(0,l.Lk)("form",{class:"add-post-form",onSubmit:e[5]||(e[5]=(0,r.D$)(((...t)=>s.handleSubmit&&s.handleSubmit(...t)),["prevent"]))},[(0,l.Lk)("div",Ut,[e[6]||(e[6]=(0,l.Lk)("label",{for:"title"},"Title:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"title","onUpdate:modelValue":e[0]||(e[0]=t=>a.formData.title=t),placeholder:"Enter title",required:""},null,512),[[r.Jo,a.formData.title]])]),(0,l.Lk)("div",Et,[e[7]||(e[7]=(0,l.Lk)("label",{for:"price"},"Price:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"price","onUpdate:modelValue":e[1]||(e[1]=t=>a.formData.price=t),placeholder:"Enter price",required:""},null,512),[[r.Jo,a.formData.price]])]),(0,l.Lk)("div",Ct,[e[8]||(e[8]=(0,l.Lk)("label",{for:"description"},"Description:",-1)),(0,l.bo)((0,l.Lk)("textarea",{id:"description","onUpdate:modelValue":e[2]||(e[2]=t=>a.formData.description=t),rows:"5",placeholder:"Enter description",required:""},null,512),[[r.Jo,a.formData.description]])]),(0,l.Lk)("div",_t,[e[9]||(e[9]=(0,l.Lk)("label",{for:"imageUrl"},"Image URL:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"imageUrl","onUpdate:modelValue":e[3]||(e[3]=t=>a.formData.image_url=t),placeholder:"Enter image URL",required:""},null,512),[[r.Jo,a.formData.image_url]])]),(0,l.Lk)("div",xt,[e[10]||(e[10]=(0,l.Lk)("label",{for:"linkUrl"},"Product Link:",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",id:"linkUrl","onUpdate:modelValue":e[4]||(e[4]=t=>a.formData.link_url=t),placeholder:"Enter product link",required:""},null,512),[[r.Jo,a.formData.link_url]])]),e[11]||(e[11]=(0,l.Lk)("button",{type:"submit",class:"save-btn"}," Submit Post ",-1))],32),a.error?((0,l.uX)(),(0,l.CE)("p",St,(0,F.v_)(a.error),1)):(0,l.Q3)("",!0)])}var Xt={data(){return{formData:{title:"",price:"",description:"",imageUrl:"",linkUrl:""},error:null}},methods:{...(0,v.i0)(["submitPost"]),async handleSubmit(){try{await this.submitPost(this.formData),this.$router.push("/")}catch(t){this.error="Failed to submit the post. Please try again.",console.error(t)}}}};const Vt=(0,f.A)(Xt,[["render",It],["__scopeId","data-v-2c6b9167"]]);var $t=Vt;const qt=[{path:"/",name:"Home",component:M},{path:"/mom-log-in",name:"LoginForm",component:ft},{path:"/find-product",name:"FindProduct",component:st},{path:"/edit-product/:id",name:"EditProductPage",component:At,props:!0},{path:"/find-store-product",name:"AddStoreProduct",component:$t,props:!0}],Jt=(0,P.aE)({history:(0,P.LA)(),routes:qt});var Ot=Jt;rt.A.defaults.baseURL="/api",rt.A.defaults.withCredentials=!0,rt.A.interceptors.request.use((t=>{const e=document.cookie.split("; ").find((t=>t.startsWith("csrf_token=")))?.split("=")[1];return e&&(t.headers["X-CSRF-Token"]=e),t}));const Tt=(0,v.y$)({state(){return{posts:[],user:null,isAuthenticated:!1}},mutations:{setPosts(t,e){t.posts=e},setUser(t,e){t.user=e,t.isAuthenticated=!0},logout(t){t.user=null,t.isAuthenticated=!1},removePost(t,e){t.posts=t.posts.filter((t=>t.id!==e))}},actions:{async login({commit:t},e){try{const o=await rt.A.post("/login-for-tara",e);return t("setUser",o.data.user),o.data}catch(o){if(o.response&&401===o.response.status)throw new Error("Invalid email or password");throw console.error("Failed to log in:",o),o}},async logout({commit:t}){try{await rt.A.post("/logout"),t("logout")}catch(e){console.error("Failed to log out:",e)}},async fetchPosts({commit:t}){try{const e=await rt.A.get("/posts");t("setPosts",e.data)}catch(e){console.error("Failed to fetch posts:",e)}},async submitPost({state:t},e){if(!t.isAuthenticated)throw new Error("User is not authenticated");try{const t=await rt.A.post("/submit-post",e,{withCredentials:!0});return t.data}catch(o){throw console.error("Failed to submit post:",o),o}},async fetchSinglePost(t,e){try{const t=await rt.A.get(`/api/posts/${e}`);return t.data}catch(o){throw console.error("Failed to fetch single post:",o),o}},async updatePost(t,e){try{const t=await rt.A.put(`/api/posts/${e.id}`,e);return console.log("Post updated successfully:",t.data),t.data}catch(o){throw console.error("Failed to update post:",o),o}},async deletePost({commit:t},e){return rt.A.delete(`/posts/${e}`).then((()=>{t("removePost",e)})).catch((t=>{throw console.error("Failed to delete post:",t),t}))}}});var Qt=Tt;i.Yv.add(s.aUl,s.QV6);const Mt=(0,r.Ef)(w);Mt.use(Qt),Mt.use(Ot),Mt.component("font-awesome-icon",a.gc),Mt.mount("#app")}},e={};function o(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,o),a.exports}o.m=t,function(){var t=[];o.O=function(e,r,i,a){if(!r){var s=1/0;for(c=0;c<t.length;c++){r=t[c][0],i=t[c][1],a=t[c][2];for(var l=!0,n=0;n<r.length;n++)(!1&a||s>=a)&&Object.keys(o.O).every((function(t){return o.O[t](r[n])}))?r.splice(n--,1):(l=!1,a<s&&(s=a));if(l){t.splice(c--,1);var d=i();void 0!==d&&(e=d)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[r,i,a]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};o.O.j=function(e){return 0===t[e]};var e=function(e,r){var i,a,s=r[0],l=r[1],n=r[2],d=0;if(s.some((function(e){return 0!==t[e]}))){for(i in l)o.o(l,i)&&(o.m[i]=l[i]);if(n)var c=n(o)}for(e&&e(r);d<s.length;d++)a=s[d],o.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return o.O(c)},r=self["webpackChunkaffiliate_website"]=self["webpackChunkaffiliate_website"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=o.O(void 0,[504],(function(){return o(6228)}));r=o.O(r)})();
//# sourceMappingURL=app.94ebe9e2.js.map