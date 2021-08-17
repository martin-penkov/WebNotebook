using Microsoft.EntityFrameworkCore.Migrations;

namespace NotebookBotAPI.Migrations
{
    public partial class noteuserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Notebooks_NotebookId",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "NotebookId",
                table: "Notes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Notes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notes_UserId",
                table: "Notes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Notebooks_NotebookId",
                table: "Notes",
                column: "NotebookId",
                principalTable: "Notebooks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Notebooks_NotebookId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_UserId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "NotebookId",
                table: "Notes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Notebooks_NotebookId",
                table: "Notes",
                column: "NotebookId",
                principalTable: "Notebooks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
