// mock-server.cjs
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// CORS: allow any local Vite origin on localhost:51xx (safe for local dev)
app.use((req, res, next) => {
  const origin = req.get('Origin');
  if (origin && origin.startsWith('http://localhost:51')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Version');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(cookieParser());

// Logging middleware (prints useful request metadata)
app.use((req, res, next) => {
  console.log('--- Incoming request ---');
  console.log('time:', new Date().toISOString());
  console.log('method:', req.method, 'url:', req.originalUrl);
  console.log('origin:', req.get('Origin') || '(none)');
  console.log('remote address:', req.ip || req.connection?.remoteAddress);
  console.log('cookies:', JSON.stringify(req.cookies || {}));
  console.log('x-version header:', req.get('X-Version') || '(none)');
  console.log('------------------------');
  next();
});

// Blue version (3 plans)
const blue = {
  version: 'blue',
  plans: [
    {
      id: 'b1',
      name: 'Basic',
      price: '9.99',
      currency: 'USD',
      billingCycle: 'mo',
      features: ['Feature A', 'Feature B'],
    },
    {
      id: 'b2',
      name: 'Standard',
      price: '19.99',
      currency: 'USD',
      billingCycle: 'mo',
      features: ['Everything in Basic', 'Feature C', 'Feature D'],
      tag: 'Popular',
      highlighted: true,
      highlighted: false,
    },
    {
      id: 'g3',
      name: 'Enterprise',
      price: '49.99',
      currency: 'USD',
      billingCycle: 'mo',
      features: ['All Growth features', 'Dedicated Manager', 'Custom Solutions'],
    },
  ],
};

// /pricing endpoint with detailed logging of decision
app.get('/', (req, res) => {
  const header = req.get('X-Version');
  let served = null;

  // header override path
  if (header === 'green') {
    res.cookie('version', 'green', { httpOnly: true, sameSite: 'lax' });
    served = 'green';
    console.log('decision: header override -> green');
    return res.json(green);
  }
  if (header === 'blue') {
    res.cookie('version', 'blue', { httpOnly: true, sameSite: 'lax' });
    served = 'blue';
    console.log('decision: header override -> blue');
    return res.json(blue);
  }

  // cookie sticky path
  if (req.cookies && req.cookies.version === 'green') {
    served = 'green';
    console.log('decision: sticky cookie -> green');
    return res.json(green);
  }
  if (req.cookies && req.cookies.version === 'blue') {
    served = 'blue';
    console.log('decision: sticky cookie -> blue');
    return res.json(blue);
  }

  // fallback random split (50/50)
  const pick = Math.random() < 0.5 ? 'blue' : 'green';
  res.cookie('version', pick, { httpOnly: true, sameSite: 'lax' });
  served = pick;
  console.log('decision: random pick ->', pick);
  return res.json(pick === 'blue' ? blue : green);
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Mock server running at http://localhost:${PORT}/pricing`);
});