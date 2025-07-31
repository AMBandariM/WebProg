package ir.doctor.painting;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document("paintings")
public class Painting {
    @Id
    private String username;
    private String title;
    private List<Shape> shapes;
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public List<Shape> getShapes() {
        return shapes;
    }
    public void setShapes(List<Shape> shapes) {
        this.shapes = shapes;
    }
}