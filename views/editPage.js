const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

    <!-- <div>PLACEHOLDER FOR AUTHOR NAME FIELD</div> -->
    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Author name</label>
      <div class="col-sm-10">
        <input name="name" type="text" class="form-control" value="${author.name}" disabled/>
      </div>
    </div>

    <!-- <div>PLACEHOLDER FOR AUTHOR EMAIL FIELD</div> -->
    <div class="form-group">
      <label for="email" class="col-sm-2 control-label">Author email</label>
      <div class="col-sm-10">
        <input name="email" type="text" class="form-control" value="${author.email}" disabled/>
      </div>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" value="${page.title}" disabled/>
      </div>
    </div>

    <!-- <div>PLACEHOLDER FOR PAGE CONTENT TEXTAREA FIELD</div> -->
    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Page content</label>
      <div class="col-sm-10">
        <input name="content" type="text" class="form-control" value="${page.content}"/>
      </div>
    </div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
