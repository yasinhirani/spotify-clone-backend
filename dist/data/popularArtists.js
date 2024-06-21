"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popularArtists = {
    title: "Popular artists",
    items: [
        {
            type: "artist",
            id: "1wRPtKGflJrBx9BmLsSwlU",
            name: "Pritam",
            shareUrl: "https://open.spotify.com/artist/1wRPtKGflJrBx9BmLsSwlU",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebcb6926f44f620555ba444fca",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178cb6926f44f620555ba444fca",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174cb6926f44f620555ba444fca",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "4YRxDV8wJFPHPTeXepOstw",
            name: "Arijit Singh",
            shareUrl: "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5eb0261696c5df3be99da6ed3f3",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f1780261696c5df3be99da6ed3f3",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab676161000051740261696c5df3be99da6ed3f3",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "1mYsTxnqsietFxj1OgoGbG",
            name: "A.R. Rahman",
            shareUrl: "https://open.spotify.com/artist/1mYsTxnqsietFxj1OgoGbG",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebb19af0ea736c6228d6eb539c",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178b19af0ea736c6228d6eb539c",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174b19af0ea736c6228d6eb539c",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "4zCH9qm4R2DADamUHMCa6O",
            name: "Anirudh Ravichander",
            shareUrl: "https://open.spotify.com/artist/4zCH9qm4R2DADamUHMCa6O",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebfc7c542c04b5f7dc8f1b1c16",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178fc7c542c04b5f7dc8f1b1c16",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174fc7c542c04b5f7dc8f1b1c16",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "5wJ1H6ud777odtZl5gG507",
            name: "Vishal Mishra",
            shareUrl: "https://open.spotify.com/artist/5wJ1H6ud777odtZl5gG507",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebfb13d10be20fdcb5a670f551",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178fb13d10be20fdcb5a670f551",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174fb13d10be20fdcb5a670f551",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "1mBydYMVBECdDmMfE2sEUO",
            name: "Sachin-Jigar",
            shareUrl: "https://open.spotify.com/artist/1mBydYMVBECdDmMfE2sEUO",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5eba038d7d87f8577bbb9686bd3",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178a038d7d87f8577bbb9686bd3",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174a038d7d87f8577bbb9686bd3",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "0y59o4v8uw5crbN9M3JiL1",
            name: "Badshah",
            shareUrl: "https://open.spotify.com/artist/0y59o4v8uw5crbN9M3JiL1",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebeddbb664c4723f268a60d8c1",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178eddbb664c4723f268a60d8c1",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174eddbb664c4723f268a60d8c1",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "6Mv8GjQa7LKUGCAqa9qqdb",
            name: "Vishal-Shekhar",
            shareUrl: "https://open.spotify.com/artist/6Mv8GjQa7LKUGCAqa9qqdb",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5eb90b6c3d093f9b02aad628eaf",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f17890b6c3d093f9b02aad628eaf",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000517490b6c3d093f9b02aad628eaf",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "2oSONSC9zQ4UonDKnLqksx",
            name: "Atif Aslam",
            shareUrl: "https://open.spotify.com/artist/2oSONSC9zQ4UonDKnLqksx",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebc40600e02356cc86f0debe84",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178c40600e02356cc86f0debe84",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174c40600e02356cc86f0debe84",
                    width: 320,
                    height: 320,
                },
            ],
        },
        {
            type: "artist",
            id: "2GoeZ0qOTt6kjsWW4eA6LS",
            name: "Darshan Raval",
            shareUrl: "https://open.spotify.com/artist/2GoeZ0qOTt6kjsWW4eA6LS",
            images: [
                {
                    url: "https://i.scdn.co/image/ab6761610000e5ebe1e00861cdb6bf56b14a1118",
                    width: 640,
                    height: 640,
                },
                {
                    url: "https://i.scdn.co/image/ab6761610000f178e1e00861cdb6bf56b14a1118",
                    width: 160,
                    height: 160,
                },
                {
                    url: "https://i.scdn.co/image/ab67616100005174e1e00861cdb6bf56b14a1118",
                    width: 320,
                    height: 320,
                },
            ],
        },
    ],
};
exports.default = popularArtists;
