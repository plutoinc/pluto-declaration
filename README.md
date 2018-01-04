# PLUTO Declaration Client

PLUTO Declaration repository.
This supports to getUserCount, getUsers, sendSheet action by lambda with google-spreadsheet API
and to uploadImage by uploading composed image to S3.

## Getting Started

```
git clone https://github.com/pluto-net/pluto-declaration.git
cd pluto-declaration && npm install
npm run dev
```

## Running the tests

Work In Progress

```
npm test
```

## Built With

* [ReactJS](https://reactjs.org/) - View Layer Library
* [Redux](http://redux.js.org/) - State Manager
* [TypeScript](http://www.typescriptlang.org/) - Main Language that substitutes Javascrpit

## Contributing

If you want to contribute something, just make Pull Request or Issue for us.
we will appreciate all of your contributions. thanks.

## Authors

* **Tylor Shin** [GitHub](https://github.com/TylorShin)
* **academey** [GitHub](https://github.com/academey)

See also the list of [contributors](https://github.com/pluto-net/pluto-declaration/graphs/contributors) who participated in this project.

## License

Work In Progress.
However, basically this project is licensed under the GPL.

## Acknowledgments

#### Why ReactJS?

ReactJS has had some license problem, but we think it's solved now.
PLUTO's frontend team is used to ReactJS a lot.
But we don't want to any learning burden except blockChain knowledge.

We might need and apply Vue or Angular later.
But React is a pretty good library and we think it's fastest way to develop product at least in our team.

#### Why Typescript?

It's for the benefits from using typed language.

* **Easy to refactoring**
  BlockChain is the bleeding edge area. It means there will be a lot of changes.
  So, DAPPS and other BlockChain applications should be refactored easily and flexibly.

* **Nice to group work**
  In plain Javascript, when you trying to use the function or helpers that made by other team mate, it's very common situation the one is ambiguous.
  We tried to avoid this problem by using typed language.

* **Why not Flow?**
  We also think [Flow](https://github.com/facebook/flow) is much more suitable for React, but PLUTO team is used to TypeScript. And there is not a big problem to use Typescript with React nowadays.
  But if there is a clear merit to use Angular4 and Typescript, we might migrate to Angular4 later.
