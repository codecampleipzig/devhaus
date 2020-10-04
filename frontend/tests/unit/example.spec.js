describe("example unit test", () => {
  it("adds 1 + 1", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
  it("process.env should be test", () => {
    const result = process.env.NODE_ENV;
    expect(result).toBe("test");
  });
});
