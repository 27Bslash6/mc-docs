# Request Server Access

Our Minecraft servers are allowlist-only to keep things friendly. Fill out this form and Dad will review your request.

<div class="access-form-container">
  <form id="access-form" action="/api/request-access" method="POST">
    <div class="form-group">
      <label for="email">Your Email *</label>
      <input type="email" id="email" name="email" required placeholder="you@example.com">
      <small>We'll only use this to let you know when you're approved</small>
    </div>

    <div class="form-group">
      <label for="minecraft_username">Minecraft Username *</label>
      <input type="text" id="minecraft_username" name="minecraft_username" required placeholder="YourGamertag">
      <small>Exactly as it appears in Minecraft</small>
    </div>

    <div class="form-group">
      <label for="platform">Platform *</label>
      <select id="platform" name="platform" required>
        <option value="">Select your platform...</option>
        <option value="java">Java Edition (PC/Mac/Linux)</option>
        <option value="bedrock">Bedrock Edition (Xbox/PlayStation/Switch/Mobile)</option>
      </select>
      <small>Bedrock only works on the idk server</small>
    </div>

    <div class="form-group">
      <label for="reason">Why do you want to join?</label>
      <textarea id="reason" name="reason" rows="3" placeholder="Optional - tell us a bit about yourself"></textarea>
    </div>

    <div class="form-group turnstile-container">
      <div class="cf-turnstile" data-sitekey="0x4AAAAAAAd3WcMJqpMsXBUT" data-theme="auto"></div>
    </div>

    <div id="form-error" class="form-error" style="display: none;"></div>

    <button type="submit" class="submit-btn">
      <span class="btn-text">:material-send: Send Request</span>
      <span class="btn-loading" style="display: none;">Sending...</span>
    </button>
  </form>
</div>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<script>
document.getElementById('access-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('.submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');
  const errorDiv = document.getElementById('form-error');

  // Reset state
  errorDiv.style.display = 'none';
  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';

  try {
    const response = await fetch('/api/request-access', {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Something went wrong');
    }

    // Fallback redirect if not automatic
    window.location.href = '/request-access/thanks/';
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = 'block';
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';

    // Reset Turnstile on error
    if (window.turnstile) {
      turnstile.reset();
    }
  }
});
</script>

<style>
.access-form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--md-code-bg-color);
  border-radius: 12px;
  border: 1px solid var(--md-default-fg-color--lightest);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--md-default-fg-color);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 6px;
  background: var(--md-default-bg-color);
  color: var(--md-default-fg-color);
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--md-primary-fg-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: var(--md-default-fg-color--light);
  font-size: 0.85rem;
}

.turnstile-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--md-primary-fg-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.submit-btn:hover {
  background: var(--md-primary-fg-color--dark);
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-error {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}
</style>

---

!!! info "Response Time"
    Requests are usually reviewed within a day or two. If you don't hear back, ask Dad directly.
