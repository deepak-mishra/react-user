import {Router, Request, Response} from "express";
import {IUser} from "../../models/users";

export class ApiRoutes {
    public readonly router: Router;
    private users = require('../data/posts.json');
    constructor() {
        this.router = Router();
        this.router.get('/users', (req, res) => this.sendAllUsers(req, res));
		this.router.get('/user', (req, res) => this.getUserByName(req, res));
		this.router.get('/user/:id', (req, res) => this.getUserById(req, res));
		this.router.put('/user/:id', (req, res) => this.updateUserById(req, res));
        this.router.post('/user', (req, res) => this.addUser(req, res));
		this.router.delete('/user', (req, res) => this.deleteUser(req, res));
		this.router.delete('/user/:id', (req, res) => this.deleteUserById(req, res));
    }

    private sendAllUsers(req: Request, res: Response) {
        res.send(this.users)
    }
    
    private addUser(req: any, res: any) {
        const user = {
			id:`${this.users.length + 1}`,
            firstName:req.body.firstName,
			lastName:req.body.firstName,
            email: req.body.email,
            telephone: req.body.telephone
        };
        this.users = [...this.users, user];
        res.send(user);
    }
	
	private getUserById(req: Request, res: Response) {
      	const user = this.users.find((ele: IUser) => ele.id === req.params.id);
		res.send([user])
	}
	
	private getUserByName(req: Request, res: Response) {
		const user = this.users.find((ele: IUser) => ele.firstName === req.query.firstName);
		res.send([user])
	}
	
	private  deleteUser(req: Request, res: Response) {
		this.users = [];
		res.send([{}])
	}
	
	private updateUserById(req: Request, res: Response){
		const filter = this.users.filter((ele: IUser) => ele.id !== req.params.id);
		const user = {
			id:req.body.id,
			firstName:req.body.firstName,
			lastName:req.body.lastName,
			email: req.body.email,
			telephone: req.body.telephone
		};
		
		this.users = [...filter, user];
		res.send(this.users);
	}
	
	private deleteUserById(req: Request, res: Response) {
		const filter = this.users.filter((ele: IUser) => ele.id !== req.params.id);
		this.users = [...filter];
		res.send(this.users);
	}
  
}