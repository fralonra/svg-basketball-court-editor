class Boundary {
  top: number;
  right: number;
  bottom: number;
  left: number;
  vCenter: number;
  hCenter: number;
  width: number;
  height: number;

  equal(other: Boundary): boolean {
    return (
      other.left === this.left &&
      other.top === this.top &&
      other.right === this.right &&
      other.bottom === this.bottom &&
      other.hCenter === this.hCenter &&
      other.vCenter === this.vCenter
    );
  }

  update(bounding: DOMRect): void {
    this.top = bounding.top;
    this.right = bounding.right;
    this.bottom = bounding.bottom;
    this.left = bounding.left;
    this.width = bounding.width;
    this.height = bounding.height;
    this.vCenter = this.height / 2 + this.top;
    this.hCenter = this.width / 2 + this.left;
  }
}

export { Boundary };
