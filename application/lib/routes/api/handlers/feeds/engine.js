'use strict';

const $ = require(__base + 'lib');

let yuvraj = {
  id: '170805000001',
  is_active: true,
  url: {
    src: 'youtube',
    id: 'wSwSaF2z124',
    channel: 'UClLB-UeOYara5Q1yMmyjGwQ',
  },
  title: {
    english: 'Yuvraj Singh 6 Sixes In An Over',
  },
  desc: {
    english: 'Yuvraj Singh Hits 6 Sixes in One Over against England ' +
             'in T20',
  },
  length: 365,
  lang: ['english'],
  categories: [
    'sports',
    'cricket',
  ],
  rating: 'u',
  likes: 15493,
};

let blockChain = {
  id: '170803000019',
  is_active: true,
  url: {
    src: 'youtube',
    id: '4sm5LNqL5j0',
    channel: 'UCTLC-I9GPgKQqr6CJvnalnA',
  },
  title: {
    english: 'Block Chain Technology',
  },
  desc: {
    english: 'Report on the future of distributed ledger (or block ' +
             'chain) technology',
  },
  length: 314,
  lang: ['english'],
  categories: [
    'technology',
  ],
  rating: 'u',
  likes: 95,
};

let lorde = {
  id: '170805000719',
  is_active: true,
  url: {
    src: 'youtube',
    id: 'J0DjcsK_-HY',
    channel: 'UCVrPiUtl29kULN2HIAm244Q',
  },
  title: {
    english: 'Lorde - Perfect Places',
  },
  desc: {
    english: 'Official video for "Perfect Places" off the album ' +
             '"Melodrama"',
  },
  length: 258,
  lang: ['english'],
  categories: [
    'music',
    'international',
  ],
  rating: 'u',
  likes: 189147,
};

let feeds = [
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
  lorde,
  yuvraj,
  blockChain,
];

const processRequest = async (req, res, next) => {
  try {
    if (req.body && req.body.user_id && req.body.id_token) {
      return feeds;
    } else {
      res.status(403).json({
        status: 'AUTHENTICATION_FAILED',
        error: 'need valid authentication data',
      });
      return;
    }
  } catch (err) {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: 'something went wrong'});
    return;
  }
};

module.exports = function(req, res, next) {
  processRequest(req, res, next)
  .then((data) => {
    if (data !== undefined) {
      res.status(200).json({status: 'OK', data: data});
    }
  })
  .catch((err) => {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: 'something went wrong'});
  });
};
