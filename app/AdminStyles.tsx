'use client';

export default function AdminStyles() {
  return (
    <style jsx global>{`
        :root{
          --violet-900:#2C1B6B;
          --violet-700:#4B2FB0;
          --violet-500:#6C4CE0;
          --violet-300:#A895F0;
          --lavender-50:#F6F3FF;
          --mint-500:#1FBE8C;
          --mint-100:#E3FBF3;
          --ink:#1B1730;
          --ink-soft:#5B5570;
          --paper:#FFFFFF;
          --line:#E7E2FA;
          --gold:#F5A623;
        }
        *{box-sizing:border-box; margin:0; padding:0;}
        html{scroll-behavior:smooth;}
        body{
          font-family:'Inter', sans-serif;
          background:var(--paper);
          color:var(--ink);
          line-height:1.7;
        }
        .display{font-family:'Space Grotesk', sans-serif;}
        a{text-decoration:none; color:inherit;}
        ul{list-style:none;}
        img,svg{display:block;}
        .wrap{max-width:1180px; margin:0 auto; padding:0 28px;}

        /* ===== NAV ===== */
        header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.9); backdrop-filter:blur(10px); border-bottom:1px solid var(--line);}
        nav{display:flex; align-items:center; justify-content:space-between; padding:16px 0;}
        .brand{display:flex; align-items:center; gap:10px; font-weight:800; font-size:21px; color:var(--violet-700); font-family:'Space Grotesk',sans-serif;}
        .brand svg{width:32px; height:32px;}
        .nav-links{display:flex; gap:30px; font-weight:600; font-size:14.5px; color:var(--ink-soft);}
        .nav-links a{position:relative; padding:4px 0;}
        .nav-links a:hover, .nav-links a.active{color:var(--violet-700);}
        .nav-links a.active::after{content:''; position:absolute; bottom:-3px; left:0; right:0; height:2px; background:var(--violet-500); border-radius:2px;}
        .nav-cta{display:flex; align-items:center; gap:12px;}
        .btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:11px 22px; border-radius:100px; font-weight:700; font-size:14px; cursor:pointer; border:none; transition:transform .18s ease, box-shadow .18s ease;}
        .btn-primary{background:var(--violet-700); color:#fff; box-shadow:0 8px 20px -6px rgba(75,47,176,.5);}
        .btn-primary:hover{transform:translateY(-2px);}
        .btn-ghost{background:transparent; color:var(--violet-700); border:1.5px solid var(--violet-300);}
        .btn-ghost:hover{background:var(--lavender-50);}
        .btn-mint{background:var(--mint-500); color:#fff; box-shadow:0 8px 20px -6px rgba(31,190,140,.45);}
        .btn-mint:hover{transform:translateY(-2px);}
        .btn-outline-white{background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.5);}

        /* ===== GENERIC PAGE HERO ===== */
        .page-hero{padding:60px 0 50px; background:radial-gradient(ellipse 600px 340px at 85% -20%, rgba(108,76,224,.14), transparent 60%);}
        .page-hero .tag{color:var(--violet-500); font-weight:800; font-size:12.5px; letter-spacing:.6px;}
        .page-hero h1{font-size:38px; font-weight:800; color:var(--violet-900); margin-top:10px; font-family:'Space Grotesk',sans-serif;}
        .page-hero p{color:var(--ink-soft); margin-top:14px; font-size:15.5px; max-width:560px;}
        .breadcrumb{font-size:13px; color:var(--ink-soft); margin-bottom:14px;}
        .breadcrumb a{color:var(--violet-700); font-weight:600;}

        .section-head{max-width:620px; margin:0 auto 44px; text-align:center;}
        .section-head .tag{color:var(--violet-500); font-weight:800; font-size:12.5px; letter-spacing:.6px;}
        .section-head h2{font-size:30px; font-weight:800; color:var(--violet-900); margin-top:10px; font-family:'Space Grotesk',sans-serif;}
        .section-head p{color:var(--ink-soft); margin-top:12px; font-size:15px;}

        /* ===== FOOTER ===== */
        footer{background:var(--violet-900); color:#D8CFF9; padding:56px 0 24px; margin-top:40px;}
        .foot-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:30px; margin-bottom:36px;}
        .foot-brand{display:flex; align-items:center; gap:10px; font-weight:800; font-size:19px; color:#fff; margin-bottom:14px; font-family:'Space Grotesk',sans-serif;}
        footer h5{color:#fff; font-size:13.5px; font-weight:800; margin-bottom:16px; letter-spacing:.3px;}
        footer li{font-size:13.5px; margin-bottom:10px; color:#C6BAEF;}
        footer li a:hover{color:#fff;}
        .foot-bottom{border-top:1px solid rgba(255,255,255,.12); padding-top:20px; text-align:center; font-size:12.5px; color:#A498D6;}

        @media(max-width:960px){
          .nav-links{display:none;}
          .page-hero h1{font-size:28px;}
        }

    `}</style>
  );
}
