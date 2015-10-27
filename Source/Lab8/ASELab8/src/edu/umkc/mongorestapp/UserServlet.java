package edu.umkc.mongorestapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/login")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UserServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("inside get");
		
		MongoClientURI uri = new MongoClientURI("mongodb://krishna:krishna@ds035004.mongolab.com:35004/aselab7");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		BasicDBObject query = new BasicDBObject();
		query.put("email", request.getParameter("email"));
		//query.put("password", request.getParameter("password"));
		DBCursor docs = users.find(query);
		response.getWriter().write(docs.toArray().toString());
		System.out.println("output : "+docs.toArray().toString());
		System.out.println("out : "+docs.count());
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
		
		/*MongoClientURI uri=new MongoClientURI("mongodb://krishna:krishna@ds035004.mongolab.com:35004/aselab7");	
		MongoClient client=new MongoClient(uri);
		DB db=client.getDB(uri.getDatabase());
		DBCollection customers=db.getCollection("users");
		
		BasicDBObject orderBy = new BasicDBObject("username", "kkkk");
		DBCursor cursor =customers.find().sort(orderBy);
		
		
		PrintWriter out = response.getWriter();
		try {
			while (cursor.hasNext())
			{
				//out.println("<p>"+cursor.next()+"</p>");
				System.out.println("username : "+cursor.next());
				System.out.println("password : "+cursor.next());
			}
		}
		
		catch (Exception e)
		{
			System.out.println(e);
		}
		finally 
		{
			client.close();
		}*/
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("inside dopost");
		/*StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line ;//= "krishna";
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		System.out.println("line : "+reader.readLine());
		//buffer.append(line);
		String data = buffer.toString();
		System.out.println("data : "+data);

		JSONObject params = (JSONObject) JSON.parse(data);
		BasicDBObject user1 = new BasicDBObject(params);
		
		for(Object key : params.keySet().toArray()) {
			user1.put(key.toString(), params.get(key));
		}
		
		System.out.println(user1.toJson());
		
		MongoClientURI uri = new MongoClientURI("mongodb://krishna:krishna@ds035004.mongolab.com:35004/aselab7");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		WriteResult result = users.insert(user1);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");

		response.getWriter().write(result.toString());*/
		
		
		String username = request.getParameter("username");
    	String password=request.getParameter("password");
    	//String cost=request.getParameter("cost");
    	
    	System.out.println("username : "+username);
    	System.out.println("password : "+password);
    	
    	BasicDBObject dbObject = new BasicDBObject();
    	dbObject.put("username", username);
    	dbObject.put("password", password);
    	//dbObject.put("price", cost);
    	
		System.out.println(dbObject);
		MongoClientURI uri=new MongoClientURI("mongodb://krishna:krishna@ds035004.mongolab.com:35004/aselab7");	
		MongoClient client=new MongoClient(uri);
		DB db=client.getDB(uri.getDatabase());
		DBCollection customers=db.getCollection("users");
		
		WriteResult result=customers.insert(dbObject);
		
		//JOptionPane.showMessageDialog(null, "Details has been Added");
		
		//response.sendRedirect("displaystocks.html");
		System.out.println("details inserted");
	}

	@Override
	protected void doOptions(HttpServletRequest arg0, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doOptions(arg0, response);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, HEAD, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}
}
