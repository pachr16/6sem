package pas;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class DbHandler {
    
    private static String url = "jdbc:mysql://mysqldb:3306/opn";
    private static String dbUsername = "STDgruppe";
    private static String dbPassword = "STDgruppe20";
    

    public List<Person> getAllPersons(){
        try(Connection conn = DriverManager.getConnection(url, dbUsername, dbPassword)){
            Class.forName("com.mysql.jdbc.Driver");
            
            PreparedStatement st = conn.prepareStatement("SELECT * FROM persons;");
            ResultSet rs = st.executeQuery();
            
            ArrayList<Person> returnList = new ArrayList<>();
            
            while (rs.next()) {
                returnList.add(new Person(rs.getInt("personid"), rs.getString("firstname"), rs.getString("lastname")));
            }
            
            return returnList;
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(DbHandler.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public void insertPerson(Person person){
        try(Connection conn = DriverManager.getConnection(url, dbUsername, dbPassword)){
            Class.forName("com.mysql.jdbc.Driver");
            
            PreparedStatement st = conn.prepareStatement("INSERT INTO persons (firstname, lastname) VALUES (?, ?)");
            st.setString(1, person.getFName());
            st.setString(2, person.getLName());
            
            st.executeQuery();
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(DbHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}