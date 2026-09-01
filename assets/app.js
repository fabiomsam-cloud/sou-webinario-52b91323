// SOU WEBINÁRIO · config compartilhada das páginas do lead
window.SW = {
  API: "https://npdxyxunsdfoxwdjjfue.supabase.co/functions/v1/sou-webinario",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZHh5eHVuc2Rmb3h3ZGpqZnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyMjk1MTgsImV4cCI6MjEwMzgwNTUxOH0.a4vyGpqBJi5UCtwCZsW5c-PFeUuUuO8eusCd2-nDq2k",

  q(name) {
    return new URLSearchParams(location.search).get(name);
  },

  async api(path, opts) {
    const res = await fetch(this.API + path, Object.assign({
      headers: {
        "Authorization": "Bearer " + this.KEY,
        "Content-Type": "application/json",
      },
    }, opts));
    return res.json();
  },

  tokenKey(slug) { return "sw_token_" + slug; },
  saveToken(slug, t) { try { localStorage.setItem(this.tokenKey(slug), t); } catch (e) {} },
  getToken(slug) { try { return localStorage.getItem(this.tokenKey(slug)); } catch (e) { return null; } },

  cookie(name) {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  },

  utm() {
    const p = new URLSearchParams(location.search), out = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(k => {
      if (p.get(k)) out[k] = p.get(k);
    });
    return out;
  },
};
